const objectA = {
    id: 1,
    name: "test",
    description: "test desc"
};

console.log('Object A: ', objectA);

const copyOfObjectA = { ...objectA };

console.log("Copied object A: ", copyOfObjectA);

console.log('trying to modify object a copy..');

copyOfObjectA.id = 12;
copyOfObjectA.name = "not a test";

console.log('Copy of Object A: ', copyOfObjectA);
console.log('Object A: ', objectA);