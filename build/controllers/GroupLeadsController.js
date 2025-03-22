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
exports.GroupLeadsController = void 0;
const schemas_1 = require("./schemas");
const database_1 = require("../database");
class GroupLeadsController {
    constructor() {
        this.getLeads = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = +req.params.groupId;
                const query = schemas_1.GetLeadsLequestSchema.parse(req.query);
                const { page = "1", pageSize = "5", name, status, sortBy = "name", order = "asc", } = query;
                const pageNumber = +page;
                const pageSizeNumber = +pageSize;
                const where = {
                    groups: {
                        some: { id: groupId },
                    },
                };
                if (name)
                    where.name = { contains: name, mode: "insensitive" };
                if (status)
                    where.status = status;
                const leads = yield database_1.prisma.lead.findMany({
                    where,
                    orderBy: { [sortBy]: order },
                    skip: (pageNumber - 1) * pageSizeNumber,
                    take: pageSizeNumber,
                    include: {
                        groups: true,
                    },
                });
                const totalLeads = yield database_1.prisma.lead.count({ where });
                res.json({
                    leads,
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
        this.addLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = schemas_1.AddLeadToGroupRequestSchema.parse(req.body);
                const updatedGroup = yield database_1.prisma.group.update({
                    data: { leads: { connect: { id: body.leadId } } }, // fazer com que o lead(leadId) se conecte ao grupo
                    where: {
                        id: +req.params.groupId,
                    },
                });
                res.status(201).json({ updatedGroup });
            }
            catch (error) {
                next(error);
            }
        });
        this.removeLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.group.update({
                    where: { id: +req.params.groupId },
                    data: {
                        leads: {
                            disconnect: { id: +req.params.leadId },
                        }, // fazer com que o lead não esteja mais conectado com o grupo
                    },
                });
                res.status(201).json({ message: "Lead removed succesfully!" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.GroupLeadsController = GroupLeadsController;
