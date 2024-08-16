const employee = {
    name: "John",
    age: 30,
    employeeId: '1r-afu82r-afafvai',
    expYrs: 24
};

const handler = {
    set(target, property, value) {
        if (property === "age") {
            if (typeof value !== "number" || value === NaN) {
                throw new Error("Age should be a number");
            }
            if (value > 100 || value < 0) {
                throw new Error("Age should be between 0 and 100");
            }
        } else if (property === "expYrs") {
            if (typeof value !== "number" || value === NaN) {
                throw new Error("Experience should be a number");
            }
            if (value > 50 || value < 0) {
                throw new Error("Experience should be between 0 and 50");
            }
        } else if (property === "employeeId" && typeof value !== "string") {
            throw new Error("Employee ID should be a string");
        } else if (property === "name") {
            if (typeof value !== "string") {
                throw new Error("Name should be a string");
            }
            if (value.length < 3) {
                throw new Error("Name should be at least 3 characters long");
            }
        }

        target[property] = value;
        return true;
    },
    get(target, property) {
        if (property in target) {
            return target[property];
        } else {
            return `Property ${property} not found`;
        }
    } 
}

const employeeProxy = new Proxy(employee, handler);

try {
    employeeProxy.age = 24;
    console.log('employeeProxy.age: ', employeeProxy.age);
    employeeProxy.expYrs = 'twelve'; // will throw error
} catch (error) {
    console.log('error thrown: ', error.message);
}