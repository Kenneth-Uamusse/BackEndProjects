"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsController = void 0;
const database_1 = require("../database");
const HttpError_1 = require("../errors/HttpError");
const schemas_1 = require("./schemas");
const library_1 = require("@prisma/client/runtime/library");
class GroupsController {
    constructor() {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield database_1.prisma.group.findMany();
                res.json(groups);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield database_1.prisma.group.findUnique({
                    where: { id: +req.params.id },
                    include: { leads: true },
                });
                if (!group)
                    throw new HttpError_1.HttpError(404, "Group not found!!");
                res.json({ group });
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = schemas_1.CreateGroupRequestSchema.parse(req.body);
                const newGroup = yield database_1.prisma.group.create({ data: body });
                res.status(201).json({ newGroup });
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = schemas_1.UpdateGroupRequestSchema.parse(req.body);
            try {
                const group = yield database_1.prisma.group.findUnique({
                    where: { id: +req.params.id },
                });
                if (!group)
                    throw new HttpError_1.HttpError(404, "Group not found!!");
                const updatedGroup = yield database_1.prisma.group.update({
                    where: { id: +req.params.id },
                    data: body,
                }); // ! O uso de duas consultas pode afectar negativamente na performance da minha api
                res
                    .status(201)
                    .json({ message: "Group Updated succesfully", updatedGroup });
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.group.delete({
                    where: { id: +req.params.id },
                });
                res.status(201).json({ message: "Group deleted succesfully!" });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError &&
                    error.code === "P2025") {
                    return next(new HttpError_1.HttpError(404, "Group not found"));
                } //** esta lógica evita o uso de duas queries para verificar se um group existe ou não melhorando a performance da api
                next(error);
            }
        });
    }
}
exports.GroupsController = GroupsController;
