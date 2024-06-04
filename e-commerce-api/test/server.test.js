const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('E-Commerce API', () => {
    describe('GET /categories/:categoryname/products', () => {
        it('should get top products', (done) => {
            chai.request(server)
                .get('/categories/Laptop/products')
                .query({ n: 10, minPrice: 1, maxPrice: 10000 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.most(10);
                    done();
                });
        });
    });

    describe('GET /categories/:categoryname/products/:productid', () => {
        it('should get product details', (done) => {
            chai.request(server)
                .get('/categories/Laptop/products/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('productName');
                    done();
                });
        });
    });
});
