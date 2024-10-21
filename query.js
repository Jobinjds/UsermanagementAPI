module.exports = {
  fetch: "Select * from users",
  insertquery:
    "INSERT INTO users (name,mobile,email,location,pincode,created_date,modified_date) VALUES($1,$2,$3,$4,$5,CURRENT_DATE,CURRENT_DATE)",
  validationquery:
    "SELECT * FROM users WHERE name=$1 OR mobile=$2 OR email=$3 OR location =$4 OR pincode=$5",
  findQuery: "SELECT * FROM users WHERE id = $1",
  updatedeleteQuery:
    "UPDATE users SET deleted = true, modified_date = CURRENT_DATE WHERE id = $1",
  querylistTrue:
    "SELECT id,name,mobile,location,pincode,created_date,modified_date FROM users WHERE deleted=false ",
  dupvalQuery:
    "SELECT * FROM users WHERE (name = $1 OR mobile = $2 OR email = $3 OR location = $4 OR pincode = $5)  AND id != $6",
  updateQuery:
    "UPDATE users SET name = $1, mobile = $2, email = $3, location = $4, pincode = $5, modified_date = CURRENT_DATE WHERE id = $6",
};
