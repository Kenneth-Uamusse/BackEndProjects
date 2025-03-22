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
exports.CampaignsController = void 0;
const database_1 = require("../database");
const HttpError_1 = require("../errors/HttpError");
const schemas_1 = require("./schemas");
const library_1 = require("@prisma/client/runtime/library");
class CampaignsController {
    constructor() {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaigns = yield database_1.prisma.campaign.findMany();
                res.json({ campaigns });
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaign = yield database_1.prisma.campaign.findUnique({
                    where: { id: +req.params.id },
                    include: {
                        leads: {
                            include: { lead: { select: { name: true, status: true } } },
                        },
                    },
                });
                if (!campaign)
                    return next(new HttpError_1.HttpError(404, "Campaign not found!!"));
                res.json({ campaign });
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = schemas_1.CreateCampaignRequestSchema.parse(req.body);
            try {
                const newCampaign = yield database_1.prisma.campaign.create({ data: body });
                res.status(201).json({ newCampaign });
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = schemas_1.UpdateCampaignRequestSchema.parse(req.body);
            try {
                const updatedCampaign = yield database_1.prisma.campaign.update({
                    where: { id: +req.params.id },
                    data: body,
                });
                res.status(201).json({ updatedCampaign });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError &&
                    error.code === "P2025") {
                    return next(new HttpError_1.HttpError(404, "Campaign not found"));
                }
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.campaign.delete({ where: { id: +req.params.id } });
                res.status(201).json({ message: "Campaign deleted succesfully!!" });
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
exports.CampaignsController = CampaignsController;
