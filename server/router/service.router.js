import express from 'express';
import { services } from '../controllers/service.controller.js';

const serviceRouter= express.Router();

serviceRouter.route('/service').get(services);

export { serviceRouter };