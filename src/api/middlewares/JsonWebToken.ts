import Unauthorized from '../../responses/clientErrors/Unauthorized';

import { decode } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { ErrorDescription, Platform, VerifyTokenStatus, ErrorCode } from "../../common/constants";
import { IDecodedToken } from '../../common/interfaces/jsonwebtoken';
import { platforms, verifyTokenSignature } from '../../utils/jsonwebtoken';
import { getPlatformPublicKey } from '../../utils/storage';

const JsonWebToken = (req: Request, res: Response, next: NextFunction) => {

    const { headers } = req;
    if (!headers.authorization) {
        throw new Unauthorized(
            "UNAUTHORIZED",
            ErrorDescription.UNAUTHORIZED,
            "access token is required"
        );
    }

    const accessToken: string = headers.authorization.replace('Bearer', '').trim();
    const decodedToken: IDecodedToken = decode(accessToken) as IDecodedToken;
    const { aud: tokenAudience, sub: tokenSubscriber } = decodedToken;
    const assignedPlatform: Platform | undefined = platforms(tokenAudience);

    if (assignedPlatform === undefined) {
        throw new Unauthorized(
            "UNAUTHORIZED",
            ErrorDescription.UNAUTHORIZED,
            "audience verification failed"
        );
    }

    // verify the signature of token with public key assigned to specific platform
    const publicKey: string = getPlatformPublicKey(assignedPlatform);
    const verifyOutcome: VerifyTokenStatus = verifyTokenSignature(
        accessToken, publicKey
    );

    switch (verifyOutcome) {
        case VerifyTokenStatus.SIGNATURE_VERIFICATION_FAILURE:
            throw new Unauthorized(
                VerifyTokenStatus.SIGNATURE_VERIFICATION_FAILURE,
                ErrorDescription.UNAUTHORIZED,
                "signature verification failed"
            );

        case VerifyTokenStatus.TOKEN_EXPIRED:
            throw new Unauthorized(
                VerifyTokenStatus.TOKEN_EXPIRED,
                ErrorDescription.UNAUTHORIZED,
                "access token expired"
            );

        case VerifyTokenStatus.SUCCESS:
            break;
        default:
            throw new Unauthorized(
                ErrorCode.SERVER_EXCEPTION,
                ErrorDescription.UNAUTHORIZED,
                "access token expired"
            );
    }

    // references: https://stackoverflow.com/questions/18875292/passing-variables-to-the-next-middleware-using-next-in-express-js
    res.locals.subscriber = tokenSubscriber;

    next();
}

export default JsonWebToken;