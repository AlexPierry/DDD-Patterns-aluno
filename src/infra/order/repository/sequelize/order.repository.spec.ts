import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/entity/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.id, product.name, 2, product.price);

        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: "1",
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId
                }
            ]
        });
    });

    it("Should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.id, product.name, 2, product.price);

        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product2);
        const orderItem2 = new OrderItem("2", product2.id, product2.name, 1, product2.price);

        order.items.push(orderItem2);
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: "1",
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: order.id,
                    product_id: orderItem2.productId
                }
            ]
        });
    });

    it('should find an order', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.id, product.name, 2, product.price);

        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });
        const orderFound = await orderRepository.find(order.id);

        expect(orderModel?.toJSON()).toStrictEqual({
            id: orderFound.id,
            customer_id: orderFound.customerId,
            total: orderFound.total(),
            items: [
                {
                    id: orderFound.items[0].id,
                    name: orderFound.items[0].name,
                    order_id: orderFound.id,
                    price: orderFound.items[0].price,
                    product_id: orderFound.items[0].productId,
                    quantity: orderFound.items[0].quantity
                }
            ]
        });
    })

    it('should find all orders', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.id, product.name, 2, product.price);

        const orderRepository = new OrderRepository();

        const order = new Order("1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderItem2 = new OrderItem("2", product.id, product.name, 1, product.price);
        const order2 = new Order("2", customer.id, [orderItem2]);
        await orderRepository.create(order2);

        const foundOrders = await orderRepository.findAll();
        const orders = [order, order2];

        expect(orders).toEqual(foundOrders);
    })
});