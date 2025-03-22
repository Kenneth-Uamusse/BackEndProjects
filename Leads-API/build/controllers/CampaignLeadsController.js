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
exports.CampaignLeadsController = void 0;
const schemas_1 = require("./schemas");
const database_1 = require("../database");
const library_1 = require("@prisma/client/runtime/library");
const HttpError_1 = require("../errors/HttpError");
class CampaignLeadsController {
    constructor() {
        this.getLeads = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaignId = +req.params.campaignId;
                const query = schemas_1.GetCampaignLeadsRequestSchema.parse(req.query);
                const { page = "1", pageSize = "5", name, status, sortBy = "name", order = "asc", } = query;
                const pageNumber = +page;
                const pageSizeNumber = +pageSize;
                const where = {
                    campaigns: { some: { campaignId } },
                }; //? Ele retorna leads que pertencem a alguma campanha com o campaignId que foi passado.
                if (name)
                    where.name = { contains: name, mode: "insensitive" };
                if (status)
                    where.campaigns = { some: { status } }; //?  inclui uma condição que verifica se há alguma campanha associada ao lead (some) que tenha o mesmo status especificado.
                const leads = yield database_1.prisma.lead.findMany({
                    where,
                    orderBy: { [sortBy]: order },
                    skip: (pageNumber - 1) * pageSizeNumber,
                    take: pageSizeNumber,
                    include: {
                        campaigns: {
                            select: {
                                campaignId: true,
                                leadId: true,
                                status: true,
                            },
                        },
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
                const body = schemas_1.AddLeadRequestSchema.parse(req.body);
                yield database_1.prisma.leadCampaign.create({
                    data: {
                        campaignId: +req.params.campaignId,
                        leadId: body.leadId,
                        status: body.status,
                    },
                });
                res.status(201).end();
            }
            catch (error) {
                next(error);
            }
        });
        this.updateLeadStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = schemas_1.UpdateLeadStatusRequestSchema.parse(req.body);
                const updatedLeadCampaign = yield database_1.prisma.leadCampaign.update({
                    data: body,
                    where: {
                        leadId_campaignId: {
                            campaignId: +req.params.campaignId,
                            leadId: +req.params.leadId,
                        },
                    },
                });
                res.status(201).json({ updatedLeadCampaign });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError &&
                    error.code === "P2025") {
                    return next(new HttpError_1.HttpError(404, "Campaign not found"));
                }
                next(error);
            }
        });
        this.removeLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.leadCampaign.delete({
                    where: {
                        leadId_campaignId: {
                            campaignId: +req.params.id,
                            leadId: +req.params.id,
                        },
                    },
                });
                res.status(201).json({ message: 'Lead removed succesfully!!' });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError &&
                    error.code === "P2025") {
                    return next(new HttpError_1.HttpError(404, "Campaign not found"));
                }
                next(error);
            }
        });
    }
}
exports.CampaignLeadsController = CampaignLeadsController;
