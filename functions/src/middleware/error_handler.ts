/*
 * Error handler for endpoints
 */
import { Request, Response, NextFunction } from 'express'

const errorHandler = (error: ErrorException, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: error.msg, error_code: error.status })
}

module.exports = errorHandler
