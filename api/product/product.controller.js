const {
    create,
    getProductByTitle,
    getProdudctById,
    getProducts,
    updateProduct,
    deleteProduct
  } = require("./product.service");
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
  
  module.exports = {
    createProduct: (req, res) => {
      const body = req.body;
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    getProductByTitle: (req, res) => {
        const title = req.params.title;
        getProductByTitle(title, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "Record not Found"
            });
          }
          results.password = undefined;
          return res.json({
            success: 1,
            data: results
          });
        });
      },
    getProdudctById: (req, res) => {
      const id = req.params.id;
      getProdudctById(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    getProducts: (req, res) => {
        getProducts((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    updateProduct: (req, res) => {
      const body = req.body;
      updateProduct(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    },
    deleteProduct: (req, res) => {
      const data = req.body;
      deleteProduct(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record Not Found"
          });
        }
        return res.json({
          success: 1,
          message: "product deleted successfully"
        });
      });
    }
  };
  