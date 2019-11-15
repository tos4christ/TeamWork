import { Router } from 'express';

import createUserRoute from './auth/createUserRoute';

import signInRoute from './auth/signInRoute';

import gifRoutes from './gifRoutes';

import articleRoutes from './articleRoutes';

import feedRoute from './feedRoute';

import docRoutes from './docsRoute';

import jwtCheck from '../utilities/jwtCheck';

const router = Router();

router.use('/auth/create-user', createUserRoute);

router.use('/auth/signin', signInRoute);

router.use('/gifs', jwtCheck, gifRoutes);

router.use('/articles', jwtCheck, articleRoutes);

router.use('/feed', jwtCheck, feedRoute);

router.use('/docs', docRoutes);

export default router;
