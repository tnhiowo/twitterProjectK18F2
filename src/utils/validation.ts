//hàm tiện ích
import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import { NextFunction, Request, Response } from 'express'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  //gọi validation nhận đc middeware
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //hàm run trả ra promise phải đợi => xài await
    await validation.run(req)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.mapped() })
  }
}
