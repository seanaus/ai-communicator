"use strict";
import admin from "../firebase.js";
import * as loggerService from "./loggerService.js";
import * as data from "../data.js";

const firestore = admin.firestore();

const isoDateTime = () => new Date().toISOString();

// const dummyJobs = [
//     {
//         "id": "000000001",
//         "task": "ai.worker.parakeet",
//         "workerParams": {
//             "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-parakeet-tdt-0.6b-v3-q8_0.bin",
//             "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech.wav"
//         }
//     },
//     {
//         "id": "000000002",
//         "task": "ai.worker.whisper",
//         "workerParams": {
//             "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-tiny.en.bin",
//             "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech.wav"
//         }
//     }
// ]

const get = async (path) => {
    try {
        const snapshot = await firestore.doc(path).get();
        return snapshot.exists ? snapshot.data() : null;
    } catch (error) {
        loggerService.logError(error);
        return null;
    }
};
const getByField = async (path, fieldName, value) => {
    try {
        if (value === "" || fieldName === "") return {};

        const qryRef = firestore
            .collection(path)
            .where(fieldName, "==", value)
            .limit(1);

        const snapshot = await qryRef.get();

        if (snapshot.empty) return {};

        const doc = snapshot.docs[0];

        return {
            id: doc.id,
            ...doc.data()
        };

    } catch (error) {
        loggerService.logError(error);
        return {};
    }
};
const getJobs = (limit) => data.defaultTaskData(limit);
const getAll = async (path, includeDocumentId = false, filters = []) => {
    //filter: {field: "<property name>", operator: "<comparison operator>", value: <comparison value>}
    //filters example: [{field: "status", operator: "==", value: "active"}]
    //filters example: [{field: "limit", operator: "==", value: 1}]
    try {
        let records = [];
        const limitValue = getLimit(filters); // Extract limit value if present
        const qry = limitValue ? getQuery(path, filters).limit(limitValue) : getQuery(path, filters);
        const snapshot = await qry.get();

        snapshot.forEach(doc => {
            let record = { ...doc.data() };
            if (includeDocumentId) {
                record = addDocId(record, doc);
            }
            records.push(record);
        });

        return limitValue ? records.slice(0, limitValue) : records;
    } catch (error) {
        loggerService.logError(error);
        return [];
    }
};
const saveAll = async (path, data) => {
    try {
        let obj = {};
        data.forEach(async (record) => {
            for (const [key, value] of Object.entries(record)) {
                obj[key] = value;
            }
            const id = await save(path, obj);
            // catch error for record save
            if (id === -1) {
                return false;
            }
            obj = {};
        })
        return true;
    } catch (error) {
        loggerService.logError(error);
        return false;
    }
}
const add = async (path, id = "") => {
    try {
        if (id === "") {
            const docRef = await firestore.collection(path).add({});
            id = docRef.id;
        } else {
            await firestore.collection(path).doc(id).set({});
        }
        return id
    } catch (error) {
        loggerService.logError(error);
        return "";
    }
}
const save = async (path, data, mergeFlag = true, id = undefined) => {
    try {
        const mergeOption = { merge: mergeFlag };

        if (id) data.id = id;

        if (data?.id === undefined || data?.id === "") data.id = await add(path);

        data.modified = isoDateTime();

        if (data?.created === undefined || data.created === null || data.created === "") {
            data.created = isoDateTime();
        }

        await firestore.collection(path).doc(data.id).set(json(data), mergeOption);

        return data.id;

    } catch (error) {
        loggerService.logError(error);
        return false;
    }
};
const addDocId = (obj, doc) => {
    try {
        if (obj["id"] === undefined) {
            obj["id"] = doc.id
        }
        return obj;
    } catch (error) {
        loggerService.logError(error);
        return false;
    }
}
const del = async (path, id) => {
    try {
        await firestore.collection(path).doc(id).delete();
        return true;
    } catch (error) {
        loggerService.logError(error);
        return false;
    }
}
const deleteCollection = async (path) => {
    try {
        const collectionRef = firestore.collection(path);
        const snapshot = await collectionRef.get();

        if (snapshot.empty) {
            loggerService.log(`Collection '${path}' is already empty or does not exist.`);
            return true;
        }

        // Firestore limits batch writes to 500 per commit
        const batchSize = 500;
        let batch = firestore.batch();
        let count = 0;

        for (const doc of snapshot.docs) {
            batch.delete(doc.ref);
            count++;

            // Commit and start new batch if limit reached
            if (count % batchSize === 0) {
                await batch.commit();
                batch = firestore.batch();
            }
        }

        // Commit remaining deletions
        if (count % batchSize !== 0) {
            await batch.commit();
        }

        loggerService.log(`Deleted ${count} documents from collection '${path}'.`);
        console.log(`dataService.deleteCollection TRUE`)
        return true;
    } catch (error) {
        loggerService.logError(error);
        console.log("dataService.deleteCollection", error)
        return false;
    }
};
const json = (data) => {
    try {
        const seen = new WeakSet();

        const sanitize = (value) => {
            // Handle null & primitives
            if (
                value === null ||
                typeof value === "string" ||
                typeof value === "number" ||
                typeof value === "boolean"
            ) {
                return value;
            }

            // Remove undefined, functions, symbols
            if (
                value === undefined ||
                typeof value === "function" ||
                typeof value === "symbol"
            ) {
                return null;
            }

            // Prevent circular references
            if (typeof value === "object") {
                if (seen.has(value)) return "[Circular]";
                seen.add(value);
            }

            // Dates
            if (value instanceof Date) {
                return value.toISOString();
            }

            // Arrays
            if (Array.isArray(value)) {
                return value.map(v => sanitize(v));
            }

            // Map → Object
            if (value instanceof Map) {
                return Object.fromEntries(
                    [...value.entries()].map(([k, v]) => [k, sanitize(v)])
                );
            }

            // Set → Array
            if (value instanceof Set) {
                return [...value].map(v => sanitize(v));
            }

            // Class instances / objects
            if (typeof value === "object") {
                return Object.keys(value).reduce((obj, key) => {
                    obj[key] = sanitize(value[key]);
                    return obj;
                }, {});
            }

            return null;
        };

        return sanitize(data);
    } catch (error) {
        loggerService.logError(error);
        return {};
    }
};

const getQuery = (path, filters = []) => {
    try {
        let qry = firestore.collection(path);

        filters.forEach(filter => {
            // Safely skip the limit filter so it doesn't execute against the database
            if (filter.field === "limit") return;

            qry = qry.where(filter.field, filter.operator, filter.value);
        });

        return qry;
    } catch (error) {
        loggerService.logError(error);
        return null;
    }
};

const applyFilters = (data, filters = []) => {

    // No filters
    if (!Array.isArray(filters) || filters.length === 0) {
        return data;
    }

    // Filter out the "limit" object so it is ignored during evaluation
    const dbFilters = filters.filter(f => f.field !== "limit");

    // If "limit" was the only filter, return data as-is
    if (dbFilters.length === 0) {
        return data;
    }

    // Convert single object into array for consistency
    const items = Array.isArray(data)
        ? data
        : [data];

    const filtered = items.filter(item => {

        // Use the cleaned dbFilters array here
        return dbFilters.every(filter => {

            const itemValue = item?.[filter.field];

            switch (filter.operator) {

                case "==":
                    return itemValue === filter.value;

                case "!=":
                    return itemValue !== filter.value;

                case ">":
                    return itemValue > filter.value;

                case ">=":
                    return itemValue >= filter.value;

                case "<":
                    return itemValue < filter.value;

                case "<=":
                    return itemValue <= filter.value;

                case "in":
                    return (
                        Array.isArray(filter.value) &&
                        filter.value.includes(itemValue)
                    );

                case "not-in":
                    return (
                        Array.isArray(filter.value) &&
                        !filter.value.includes(itemValue)
                    );

                case "array-contains":
                    return (
                        Array.isArray(itemValue) &&
                        itemValue.includes(filter.value)
                    );

                case "array-contains-any":
                    return (
                        Array.isArray(itemValue) &&
                        Array.isArray(filter.value) &&
                        filter.value.some(v => itemValue.includes(v))
                    );

                default:
                    return true;

            }

        });

    });

    return Array.isArray(data) ? filtered : filtered[0] ?? null;
};
const getLimit = (filters = []) => {
    let limitValue = null;

    // Check if the array has items and the last item is the "limit" filter
    if (filters.length > 0 && filters[filters.length - 1].field === "limit") {
        const limitObj = filters.pop(); // Removes and returns the last item
        limitValue = limitObj.value;    // Extracts the actual limit number (e.g., 1)
    }
    return limitValue
}
// const testGetDoc = async () => {
//     try {
//         const data = await get(
//             "brand/pKoce95pAqvtrEq0ZePj/users/5Rw4X8lVT9Y1dpOSbMqraTjVzHo2"
//         );

//         if (data) {
//             console.log(data);
//         } else {
//             console.log("Document not found");
//         }
//     } catch (err) {
//         console.error("Firebase error:", err);
//     }
// };
// const testGetDocByField = async () => {
//     try {
//         const data = await getByField(
//             "brand/pKoce95pAqvtrEq0ZePj/users",
//             "email",
//             "webaddress01@googlemail.com"
//         );

//         if (data) {
//             console.log(data);
//         } else {
//             console.log("Document not found");
//         }
//     } catch (err) {
//         console.error("Firebase error:", err);
//     }
// };
// const testGetDocs = async () => {
//     try {
//         const data = await getAll(
//             "brand/pKoce95pAqvtrEq0ZePj/users",
//             true
//         );

//         if (data) {
//             console.log(data);
//         } else {
//             console.log("Document data not found");
//         }
//     } catch (err) {
//         console.error("Firebase error:", err);
//     }
// };
// const testSaveDoc = async () => {
//     try {
//         const data = await get(
//             "brand/pKoce95pAqvtrEq0ZePj/users/5Rw4X8lVT9Y1dpOSbMqraTjVzHo2"
//         );

//         if (data) {
//             await save("brand/pKoce95pAqvtrEq0ZePj/users/", data, true);
//             console.log(data);
//         } else {
//             console.log("Document data not found");
//         }
//     } catch (err) {
//         console.error("Firebase error:", err);
//     }
// };

export {
    get,
    getByField,
    getAll,
    getJobs,
    save,
    saveAll,
    del,
    deleteCollection,
};
