import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AccessBlacklist,
  AccessBlacklistDocument,
  RefreshRevoked,
  RefreshRevokedDocument,
} from './entities/auth.entity';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(AccessBlacklist.name)
    private readonly accessBlacklistModal: Model<AccessBlacklistDocument>,
    @InjectModel(RefreshRevoked.name)
    private readonly refreshRevokedModel: Model<RefreshRevokedDocument>,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async use(req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    //   try {
    //     const accessToken: string = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    //     let { refreshToken } = req.body;
    //
    //     // checking this in-case, we want a authenticated GET request
    //     if (refreshToken === undefined)
    //       refreshToken = req.query.refreshToken as string;
    //
    //     if (accessToken === undefined || refreshToken === undefined)
    //       ReqLogger(
    //         req,
    //         401,
    //         'Authentication failed! Access and/or Refresh Tokens not sent',
    //       );
    //
    //     const tokenBlacklisted =
    //       (await AccessBlackList.findOne({
    //         accessToken,
    //       }).lean()) != null;
    //     let tokenUserChangePasswordDate: number;
    //     // this is the case when the token sent has not been involved in logout or changePass
    //     if (!tokenBlacklisted) {
    //       try {
    //         // if token is not valid, catch block is executed
    //         const authUser = jwt.verify(
    //           req.token,
    //           process.env.SECRET,
    //         ) as AuthUser;
    //         const user = await this.userModel.findById(authUser.id).lean();
    //
    //         tokenUserChangePasswordDate = user.changePasswordDate;
    //         req.authUser = authUser;
    //         const { iat } = authUser;
    //
    //         // checking this to discard the tokens created before password change/forget event.
    //         if (iat * 1000 < new Date(tokenUserChangePasswordDate).getTime()) {
    //           ReqLogger(req, 403, 'Access Token Expired!!!');
    //           return next();
    //         }
    //         req.isAccessTokenValid = true;
    //         req.accessToken = accessToken;
    //         req.refreshToken = refreshToken;
    //       } catch (e) {
    //         const refreshRevoked =
    //           (await RefreshRevoked.findOne({
    //             refreshToken,
    //           }).lean()) != null;
    //
    //         if (!refreshRevoked) {
    //           const decodedRefreshToken = jwt.verify(
    //             refreshToken,
    //             process.env.REFRESH_TOKEN_KEY,
    //           ) as AuthUser;
    //           const { id, iat } = decodedRefreshToken;
    //           const user = await User.findById(id).lean();
    //
    //           tokenUserChangePasswordDate = user.changePasswordDate;
    //
    //           // checking to discard the tokens created post password change/forget event.
    //           if (iat * 1000 < new Date(tokenUserChangePasswordDate).getTime()) {
    //             ReqLogger(req, 403, 'Refresh Token Expired!!!');
    //             return next();
    //           }
    //
    //           // adding this token to refreshRevoked, to prevent future usage
    //           await RefreshRevoked.create({ refreshToken });
    //           const refreshAuthUser = decodedRefreshToken;
    //           req.authUser = refreshAuthUser;
    //           req.isAccessTokenValid = false;
    //
    //           // generating new token to be returned by request.
    //           try {
    //             const { accessToken: newAccess, refreshToken: newRefresh } =
    //               getTokens({
    //                 id: refreshAuthUser.id,
    //                 email: refreshAuthUser.email,
    //                 name: refreshAuthUser.name,
    //                 changePasswordDate: refreshAuthUser.changePasswordDate,
    //               });
    //             req.accessToken = newAccess;
    //             req.refreshToken = newRefresh;
    //           } catch (err) {
    //             const error = new RequestError(500);
    //             return next(
    //               new HttpException(
    //                 'Authentication flow failed, please try again later.',
    //                 500,
    //               ),
    //             );
    //           }
    //         } else
    //           ReqLogger(
    //             req,
    //             401,
    //             'Authentication failed!, the refresh token have been revoked.',
    //           );
    //       }
    //     } else {
    //       // In resolvers, we check if AuthUser is null, we throw Authentication Error.
    //       ReqLogger(
    //         req,
    //         401,
    //         'Authentication failed!, Access Token is blacklisted!!',
    //       );
    //     }
    //   } catch (err) {
    //     ReqLogger(
    //       req,
    //       401,
    //       `Error with token. AccessToken might not sent have been sent, Error Object: ${JSON.stringify(
    //         err,
    //       )}`,
    //     );
    //   }
    next();
  }
}
