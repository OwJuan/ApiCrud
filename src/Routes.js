const { Router } = require("express");

// const ProjectController = require('./app/controllers/ProjectController');
const UserController = require("./app/controllers/UserController");
const CategoryController = require("./app/controllers/CategoryController");
const ProductController = require("./app/controllers/ProductController");
const OrderController = require("./app/controllers/OrderController");

const router = Router();

// router.get('/', ProjectController.index);

router.post("/auth/", UserController.auth);
router.get("/users", UserController.index);
router.get("/users/:id", UserController.show);
router.delete("/users/:id", UserController.delete);
router.post("/users/", UserController.store);
router.put("/users/:id", UserController.update);

router.get("/categories", CategoryController.index);
router.post("/categories", CategoryController.store);

router.get("/list-products", ProductController.index);
router.post("/products", ProductController.store);
router.get("/products/:id", ProductController.show);
router.delete("/products/:id", ProductController.delete);
router.put("/products/:id", ProductController.update);

router.post("/orders", OrderController.store);
router.post("/orders-list", OrderController.index);

module.exports = router;
