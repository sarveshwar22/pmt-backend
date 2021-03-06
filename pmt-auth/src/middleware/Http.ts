/**
 * Defines all the requisites in HTTP
 *
 * @author DevSoc
 */
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as express from 'express';

import { Application } from 'express';

class Http {
	public express: Application;

	constructor(__express: Application) {
		this.express = __express;
	}

	public mount(): Application {

		this.express.use(cookieParser());
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: true }));
		this.express.use(passport.initialize());
		this.express.use(express.static(path.join(__dirname, 'public')));

		this.express.use((req, res, next): void => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // cors header
			if (req.method === 'OPTIONS') {
				res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, HEAD');
				res.header('Access-Control-Max-Age', '1728000');
				res.header('Access-Control-Allow-Credentials', 'true');
				res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,Accept,Authorization, X-AUTH-TOKEN');
				res.header('Content-Length', '0');
				res.sendStatus(208);
			} else {
				next();
				// Google analytics logging comes here
			}
		});

		// Disable the x-powered-by header in response
		this.express.disable('x-powered-by');

		this.express.use('/', (req, res): void => {
			console.log('Welcome to the app');
			res.status(200).json({
				'success': true,
				'message': 'Welcome to Mello: Simple, Sweet and Mello :D'
			});
		});

		return this.express;
	}
}

export default Http;
