const wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

export const login = async (username, password) => {
    await wait(500);
    if (username === "admin" && password === "password") {
        return {
            username: "admin",
            name: "Mr Boss",
            admin: true
        };
    }
    throw new Error("No such user");
};
