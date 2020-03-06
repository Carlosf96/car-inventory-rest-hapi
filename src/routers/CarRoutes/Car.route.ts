import CarController from '../../controllers/Car.controller';
import { Router } from '../typings';

const carController = CarController();

const getAllCars: Router = {
  method: 'GET',
  path: '/cars/',
  handler: carController.get,
};

export default getAllCars;
