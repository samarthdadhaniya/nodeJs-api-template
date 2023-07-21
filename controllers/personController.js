const Person = require("../models/person");

exports.createPerson = async (req, res) => {
  try {
    const { firstName, lastName, age } = req.body;
    const person = new Person({ firstName, lastName, age });
    await person.save();
    res.status(201).json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find();

    res.json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPersonById = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findById(id);
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const person = await Person.findByIdAndUpdate(
      id,
      { firstName, lastName, age },
      { new: true }
    );
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findByIdAndRemove(id);
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json({ message: "Person deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
