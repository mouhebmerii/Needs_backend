const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into product(title, image, description, price, short_desc	, cat_id, user_id) 
                values(?,?,?,?,?,?,?)`,
      [
        data.title,
        data.image,
        data.description,
        data.price,
        data.short_desc,
        data.cat_id,
        data.user_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getProductByTitle: (email, callBack) => {
    pool.query(
      `select * from product where title = ?`,
      [title],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getProdudctById: (id, callBack) => {
    pool.query(
      `select * from product where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getProducts: callBack => {
    pool.query(
      `select * from product`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateProduct: (data, callBack) => {
    pool.query(
      `update product set title=?, image=?, description=?, price=?, short_desc=?, cat_id=?, user_id=?`,
      [
        data.title,
        data.image,
        data.description,
        data.price,
        data.short_desc,
        data.cat_id,
        data.user_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteProduct: (data, callBack) => {
    pool.query(
      `delete from product where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
