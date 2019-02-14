const output = function () {
    let props = [];
    Object.values(this).filter(prop => typeof prop !== "function").forEach(el => {
        if (typeof el === "object") {
            el.length > 0 ? props.push(el.map(deepEl => deepEl.name)) : false;
        } else {
            props.push(el);
        }
    });
    return props.join(";");
};

const dog = {
    species: "dog",
    name: "Kord",
    gender: "male",
    legs: 4,
    hands: 0, 
    saying: "woof!",
    friends: [],
    output: output
};

const cat = {
    species: 'cat',
    name: 'Whiskas',
    gender: "male",
    legs: 4,
    hands: 0,
    saying: 'meeow!',
    friends: [],
    output: output
};

const woman = {
    species: "human",
    name: "Michelle",
    gender: "female",
    legs: 2,
    hands: 2,
    saying: "I'm a woman!",
    friends: [],
    output: output
};

const man = {
    species: "human",
    name: "Tony",
    gender: "male",
    legs: 2,
    hands: 2,
    saying: "I'm a man!",
    friends: [dog, cat, woman],
    output: output
};

const catWoman = {
    species: "human",
    name: "Dianne",
    gender: "female",
    legs: 2,
    hands: 2,
    saying: cat.saying,
    friends: [],
    output: output
};

print(dog.output());
print(cat.output());
print(woman.output());
print(man.output());
print(catWoman.output());
