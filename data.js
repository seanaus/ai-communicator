const TURNS = [
    {
        "turnId": "0001",
        "status": "awaiting",
        "current": {
            "passId": "pass-001",
            "executionReference": {
                "capability": "process-inference",
                "reference": {
                    "dynaset": "agent",
                    "id": "parakeet"
                }
            },
            "requirements": ["ai.worker.parakeet"]
        },
        "intake": {
            "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-parakeet-tdt-0.6b-v3-q8_0.bin",
            "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech.wav"
        },
        "nextToken": "next.token.0001",
        "waitToken": null,
        "expiresAt": null,
        "allocationId": null,
        "passes": []
    },
    {
        "turnId": "0002",
        "status": "awaiting",
        "current": {
            "passId": "pass-001",
            "executionReference": {
                "capability": "process-inference",
                "reference": {
                    "dynaset": "agent",
                    "id": "parakeet"
                }
            },
            "requirements": ["ai.worker.parakeet"]
        },
        "intake": {
            "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-parakeet-tdt-0.6b-v3-q8_0.bin",
            "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech.wav"
        },
        "nextToken": "next.token.0002",
        "waitToken": null,
        "expiresAt": null,
        "allocationId": null,
        "passes": []
    },
    {
        "turnId": "0003",
        "status": "awaiting",
        "current": {
            "passId": "pass-001",
            "executionReference": {
                "capability": "process-inference",
                "reference": {
                    "dynaset": "agent",
                    "id": "parakeet"
                }
            },
            "requirements": ["ai.worker.parakeet"]
        },
        "intake": {
            "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-parakeet-tdt-0.6b-v3-q8_0.bin",
            "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech.wav"
        },
        "nextToken": "next.token.0003",
        "waitToken": null,
        "expiresAt": null,
        "allocationId": null,
        "passes": []
    },
    {
        "turnId": "0004",
        "status": "awaiting",
        "current": {
            "passId": "pass-001",
            "executionReference": {
                "capability": "process-inference",
                "reference": {
                    "dynaset": "agent",
                    "id": "whisper"
                }
            },
            "requirements": ["ai.worker.whisper"]
        },
        "intake": {
            "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-tiny.en.bin",
            "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech2.wav"
        },
        "nextToken": "next.token.0004",
        "waitToken": null,
        "expiresAt": null,
        "allocationId": null,
        "passes": []
    },
    {
        "turnId": "0005",
        "status": "awaiting",
        "current": {
            "passId": "pass-001",
            "executionReference": {
                "capability": "process-inference",
                "reference": {
                    "dynaset": "agent",
                    "id": "whisper"
                }
            },
            "requirements": ["ai.worker.whisper"]
        },
        "intake": {
            "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-tiny.en.bin",
            "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech2.wav"
        },
        "nextToken": "next.token.0005",
        "waitToken": null,
        "expiresAt": null,
        "allocationId": null,
        "passes": []
    },
    {
        "turnId": "0006",
        "status": "awaiting",
        "current": {
            "passId": "pass-001",
            "executionReference": {
                "capability": "process-inference",
                "reference": {
                    "dynaset": "agent",
                    "id": "whisper"
                }
            },
            "requirements": ["ai.worker.whisper"]
        },
        "intake": {
            "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-tiny.en.bin",
            "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech2.wav"
        },
        "nextToken": "next.token.0006",
        "waitToken": null,
        "expiresAt": null,
        "allocationId": null,
        "passes": []
    },
    {
        "turnId": "0007",
        "status": "awaiting",
        "current": {
            "passId": "pass-001",
            "executionReference": {
                "capability": "process-inference",
                "reference": {
                    "dynaset": "agent",
                    "id": "whisper"
                }
            },
            "requirements": ["ai.worker.whisper"]
        },
        "intake": {
            "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-tiny.en.bin",
            "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech3.wav"
        },
        "nextToken": "next.token.0007",
        "waitToken": null,
        "expiresAt": null,
        "allocationId": null,
        "passes": []
    },
    {
        "turnId": "0008",
        "status": "awaiting",
        "current": {
            "passId": "pass-008",
            "executionReference": {
                "capability": "process-inference",
                "reference": {
                    "dynaset": "agent",
                    "id": "deepseek"
                }
            },
            "requirements": ["ai.worker.deepseek"]
        },
        "intake": {
            "model": "\\\\ELITEBOOK840G6\\shared\\models\\DeepSeek-R1-Distill-Qwen-1.5B-Q8_0.gguf",
            "prompt": "\\\\ELITEBOOK840G6\\shared\\files\\speech2.wav"
        },
        "nextToken": "next.token.0008",
        "waitToken": null,
        "expiresAt": null,
        "allocationId": null,
        "passes": []
    }
];

const getTurnIdx = (id) => TURNS.findIndex(turn => turn.turnId === id);

export const getTurns = async () => {
    // 1. Simulate a 200ms database/network query latency
    await new Promise(resolve => setTimeout(resolve, 200));

    return TURNS

};
export const getTurn = async (id) => {
    // 1. Simulate a 200ms database/network query latency
    await new Promise(resolve => setTimeout(resolve, 200));
    const idx = getTurnIdx(id);
    return idx > -1 ? TURNS[idx] : undefined;

};



export const editTurn = async (id, obj) => {
    // Simulate a 200ms database/network query latency
    await new Promise(resolve => setTimeout(resolve, 200));

    const idx = getTurnIdx(id);

    if (idx === -1) {
        throw new Error(`Turn with id "${id}" not found`);
    }

    for (const [key, value] of Object.entries(obj)) {
        const keys = key.split(".");
        let target = TURNS[idx];

        // Walk down to the object containing the final property
        for (let i = 0; i < keys.length - 1; i++) {
            target = target[keys[i]];
        }

        // Update the final property
        target[keys[keys.length - 1]] = value;
    }
};

