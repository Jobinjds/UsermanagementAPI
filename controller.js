const express = require("express");
const dataBase = require("./dbConnection");
const queries = require("./query");

const validateUserData = (mobile, email) => {
  const mobileVal = /^\d{10}$/;
  const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!mobileVal.test(mobile)) {
    return "Invalid mobile number";
  }
  if (!emailVal.test(email)) {
    return "Invalid email address";
  }

  return null;
};

const createData = async (req, res) => {
  const { name, mobile, email, location, pincode } = req.body;

  const validationError = validateUserData(mobile, email);
  if (validationError) {
    return res.status(500).json({ error: validationError });
  }

  try {
    const result = await dataBase.query(queries.validationquery, [
      name,
      mobile,
      email,
      location,
      pincode,
    ]);

    if (result.rows.length > 0) {
      const duplicateData = [];
      if (result.rows[0].name === name) duplicateData.push("name");
      if (result.rows[0].mobile === mobile) duplicateData.push("mobile");
      if (result.rows[0].email === email) duplicateData.push("email");
      if (result.rows[0].location === location) duplicateData.push("location");
      if (result.rows[0].pincode === pincode) duplicateData.push("pincode");
      console.log(duplicateData);
      return res.status(500).json({
        error: `${duplicateData.join( ", "  )} User Details already exists in the DataBase.`,
      });
    }

    const insertResult = await dataBase.query(queries.insertquery, [
      name,
      mobile,
      email,
      location,
      pincode,
    ]);
    res.status(200).json({
      message: "user created successfully",
      user: insertResult.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

const deleteData = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await dataBase.query(queries.findQuery, [userId]);

    if (result.rows.length === 0) {
      return res.status(200).json({ error: "No user found with this ID" });
    }

    const user = result.rows[0];

    if (user.deleted) {
      return res.status(500).json({ error: "User already deleted" });
    }

    const deleteResult = await dataBase.query(queries.updatedeleteQuery, [
      userId,
    ]);

    res.status(200).json({
      message: "User deleted successfully",
      user: deleteResult.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

const listData = async (req, res) => {
  try {
    const result = await dataBase.query(queries.querylistTrue);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

const updateData = async (req, res) => {
  const userId = req.params.id;
  const { name, mobile, email, location, pincode } = req.body;

  const validationError = validateUserData(mobile, email);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const userResult = await dataBase.query(queries.findQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(405).json({ error: "No user found with the ID" });
    }

    if (userResult.rows[0].deleted) {
      return res.status(400).json({ error: "User already deleted" });
    }

    const duplicateResult = await dataBase.query(queries.dupvalQuery, [
      name,
      mobile,
      email,
      location,
      pincode,
      userId,
    ]);

    if (duplicateResult.rows.length > 0) {
      const duplicateFields = [];
      if (duplicateResult.rows[0].name === name) duplicateFields.push("name");
      if (duplicateResult.rows[0].mobile === mobile)
        duplicateFields.push("mobile");
      if (duplicateResult.rows[0].email === email)
        duplicateFields.push("email");
      if (duplicateResult.rows[0].location === location)
        duplicateFields.push("location");
      if (duplicateResult.rows[0].pincode === pincode)
        duplicateFields.push("pincode");

      return res
        .status(400)
        .json({ error: `${duplicateFields.join(", ")} already exists.` });
    }

    const updateResult = await dataBase.query(queries.updateQuery, [
      name,
      mobile,
      email,
      location,
      pincode,
      userId,
    ]);

    res.json({
      message: "User updated successfully",
      status:'success',
      statusCode:'200',
      user: updateResult.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = {
  createData,
  deleteData,
  listData,
  updateData,
};
