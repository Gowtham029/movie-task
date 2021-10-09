import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interface/user.interface";
import { userConstants } from "./user.const";
import { PatchUserDto } from "./dto/patch-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(userConstants.USER_SCHEMA)
        private readonly userModel: Model<User>,
    ) {}

    async update(_id: string, patchUserDto: PatchUserDto): Promise<void> {
        patchUserDto.updatedBy = _id;
        const result = await this.userModel.findByIdAndUpdate(
            _id,
            patchUserDto,
        );
        await result.save();
    }

    async getUsers(skip: number, limit: number) {
        const result = await this.userModel
            .find({}, { password: 0 })
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: "desc" });
        return result;
    }

    async getUserById(id: string) {
        const result = await this.userModel.findById(id, { password: 0 });
        return result;
    }
}
