import { db, createCrudConfig } from '../db/DataStore';
import CarController from '../controllers/Car.controller';

const carController = CarController(db);

const carRouter = createCrudConfig(carController, '/cars/');

export default { carRouter };
