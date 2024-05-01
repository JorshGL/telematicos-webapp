from db import db
# create  a model for product
class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    
    def __init__(self, name, price, stock, description):
        self.name = name
        self.price = price
        self.stock = stock
        self.description = description