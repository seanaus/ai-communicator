export const defaultTaskData = async (limit = 8) => {
    // 1. Simulate a 200ms database/network query latency
    await new Promise(resolve => setTimeout(resolve, 200));

    const allTasks = [
        {
            "dispatchId": "dispatch-42",
            "status": "pending",
            "reference": {
                "opaque": {
                    "task": "ai.worker.parakeet",
                    "command": {
                        "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-parakeet-tdt-0.6b-v3-q8_0.bin",
                        "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech.wav"
                    }
                }
            }
        },
        {
            "dispatchId": "dispatch-43",
            "status": "pending",
            "reference": {
                "opaque": {
                    "task": "ai.worker.parakeet",
                    "command": {
                        "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-parakeet-tdt-0.6b-v3-q8_0.bin",
                        "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech.wav"
                    }
                }

            }
        },
        {
            "dispatchId": "dispatch-44",
            "status": "pending",
            "reference": {
                "opaque": {
                                    "task": "ai.worker.parakeet",
                    "command": {
                        "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-parakeet-tdt-0.6b-v3-q8_0.bin",
                        "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech.wav"
                    }
                }

            }
        },
        {
            "dispatchId": "dispatch-45",
            "status": "pending",
            "reference": {
                "opaque": {
                    "task": "ai.worker.whisper",
                    "command": {
                        "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-tiny.en.bin",
                        "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech2.wav"
                    }
                }

            }
        },
        {
            "dispatchId": "dispatch-46",
            "status": "pending",
            "reference": {
                "opaque": {
                    "task": "ai.worker.whisper",
                    "command": {
                        "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-tiny.en.bin",
                        "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech2.wav"
                    }
                }

            }
        },
        {
            "dispatchId": "dispatch-47",
            "status": "pending",
            "reference": {
                "opaque": {
                    "task": "ai.worker.whisper",
                    "command": {
                        "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-tiny.en.bin",
                        "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech3.wav"
                    }
                }

            }
        },
        {
            "dispatchId": "dispatch-48",
            "status": "pending",
            "reference": {
                "opaque": {
                    "task": "ai.worker.whisper",
                    "command": {
                        "model": "\\\\ELITEBOOK840G6\\shared\\models\\ggml-tiny.en.bin",
                        "file": "\\\\ELITEBOOK840G6\\shared\\files\\speech3.wav"
                    }
                }

            }
        },
        {
            "dispatchId": "dispatch-49",
            "status": "pending",
            "reference": {
                "opaque": {
                    "task": "ai.worker.deepseek",
                    "command": {
                        "model": "\\\\ELITEBOOK840G6\\shared\\models\\DeepSeek-R1-Distill-Qwen-1.5B-Q8_0.gguf",
                        "prompt": "Why is the sky blue?"
                    }
                }

            }
        }
    ];

    // 2. Slice the tasks array according to the requested limit
    const limitedTasks = allTasks.slice(0, limit);

    return {
        "ok": true,
        "page": {
            "tasks": limitedTasks,
            "count": limitedTasks.length,
            "cursor": null,
            "nextCursor": null,
            "hasMore": allTasks.length > limit
        }
    };
};
