const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

import { deploy } from "../controllers/deploy";
import { builds } from "../controllers/builds";

const asyncErrorHandler = (fn: any) => (req: any, res: any, next: any) =>
  fn(req, res, next).catch(next);

const enforceEmptyQuery = (req: any, res: any, next: any) => {
  if (req.query && req.query.length)
    res
      .status(400)
      .send(
        `This endpoint doesn't expect any query parameters, but you provided ${JSON.stringify(
          req.querys
        )}.`
      );
  else next();
};

const enforceEmptyBody = (req: any, res: any, next: any) => {
  if (req.body && req.body.length)
    res
      .status(400)
      .send(
        `This endpoint doesn't expect any content in its request body, but you provided ${JSON.stringify(
          req.body
        )}.`
      );
  else next();
};

const authenticate = asyncErrorHandler(async (req: any, res: any, next: any) => {
  console.log("authenticate");

  console.log(req.headers);

  console.log(req.headers["x-overridetoken"]);

  if (req.headers["x-overridetoken"] === process.env.TOKEN_OVERRIDE_SELF) {
    console.log("pass");

    next();
  } else {
    if (!req.cookies) {
      return res.status(403).json({
        code: 1
      });
    }

    const { cookie } = req.cookies;

    if (!cookie) {
      return res.status(403).json({
        code: 1
      });
    }

    next();
  }

  // version 1
  // if( req.session.walletAddress )
  //   next();
  // else
  //   throw new httpErrors.Unauthorized();
  //
});

router.use(bodyParser.json());
router.use(cookieParser());

// curl http://0.0.0.0:3000/api/deploy
// curl --header "X-OverrideToken: efc192fd369a5bf2db5fcacbeb037442" http://0.0.0.0:3000/api/deploy
// curl --header "X-OverrideToken: efc192fd369a5bf2db5fcacbeb037442" http://master.playentertainment.online/api/deploy

router.get(
  "/deploy",
  authenticate,
  asyncErrorHandler(async (req: any, res: any) => {
    let response = await deploy.deploy_without_callback();

    res.status(200).json({
      code: 0,
      data: {}
    });
  })
);

router.get(
  "/get_master_url",
  authenticate,
  asyncErrorHandler(async (req: any, res: any) => {
    res.status(200).json(await builds.getMasterUrl());
  })
);

router.get("/test", (req: any, res: any) => {
  const { spawn } = require("child_process");

  const script = path.dirname(__filename) + "/server/bash/" + "hi.sh";

  var child = spawn("sh", [script]);

  child.stdout.on("data", function (data: any) {
    console.log("stdout: " + data);
  });

  child.stderr.on("data", function (data: any) {
    console.log("stderr: " + data);
  });

  child.on("close", function (code: string) {
    console.log("child process exited with code " + code);
  });

  return res.status(200).send({});
});

export default router;
