import Service from "./Services.js";
import User from "./Users.js";
import Sales from "./Sales.js";
import PaymentMethod from "./PaymentMethod.js";


Sales.belongsTo(User, {
  foreignKey: "barberId",
  as: "barber",
});

User.hasMany(Sales, {
  foreignKey: "barberId",
});

Sales.belongsTo(Service, {
  foreignKey: "serviceId",
});

Service.hasMany(Sales, {
  foreignKey: "serviceId",
});

Sales.belongsTo(PaymentMethod, {
  foreignKey: "paymentMethodId",
});

PaymentMethod.hasMany(Sales, {
  foreignKey: "paymentMethodId",
});

export { Service, User, Sales, PaymentMethod };