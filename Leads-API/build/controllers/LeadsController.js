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
exports.LeadsController = void 0;
const database_1 = require("../database");
const schemas_1 = require("./schemas");
const HttpError_1 = require("../errors/HttpError");
const library_1 = require("@prisma/client/runtime/library");
class LeadsController {
    constructor() {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = schemas_1.GetLeadsLequestSchema.parse(req.query);
                const { page = "1", pageSize = "5", name, status, sortBy = "name", order = "asc", } = query;
                const pageNumber = +page;
                const pageSizeNumber = +pageSize;
                const where = {};
                if (name)
                    where.name = { contains: name, mode: "insensitive" };
                if (status)
                    where.status = status;
                const leads = yield database_1.prisma.lead.findMany({
                    where,
                    skip: (pageNumber - 1) * pageSizeNumber,
                    take: pageSizeNumber,
                    orderBy: { [sortBy]: order }, //ex: Se sortBy = "email" e order = "desc", os resultados serão ordenados pelo email em ordem decrescente
                });
                const totalLeads = yield database_1.prisma.lead.count({ where });
                res.json({
                    data: leads,
                    meta: {
                        page: pageNumber,
                        pageSize: pageSizeNumber,
                        totalLeads,
                        totalPages: Math.ceil(totalLeads / pageSizeNumber),
                    },
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = schemas_1.CreateLeadRequestSchema.parse(req.body);
                const newLead = yield database_1.prisma.lead.create({ data: body });
                res.status(201).json({ newLead });
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const lead = yield database_1.prisma.lead.findUnique({
                    where: { id: +req.params.id },
                    include: { groups: true, campaigns: true },
                });
                if (!lead)
                    throw new HttpError_1.HttpError(404, "Lead not found!");
                res.json({ lead });
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = schemas_1.UpdateLeadRequestSchema.parse(req.body);
            try {
                const updatedLead = yield database_1.prisma.lead.update({
                    where: { id: +req.params.id },
                    data: body,
                });
                res.status(201).json({ updatedLead });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError &&
                    error.code === "P2025") {
                    return next(new HttpError_1.HttpError(404, "Lead not found"));
                }
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.lead.delete({
                    where: { id: +req.params.id },
                });
                res.status(201).json({ message: "Lead deleted succesfully" });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError &&
                    error.code === "P2025") {
                    return next(new HttpError_1.HttpError(404, "Lead not found"));
                }
                next(error);
            }
        });
    }
}
exports.LeadsController = LeadsController;
