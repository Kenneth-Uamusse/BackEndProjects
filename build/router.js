"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const LeadsController_1 = require("./controllers/LeadsController");
const GroupsController_1 = require("./controllers/GroupsController");
const CampaignsController_1 = require("./controllers/CampaignsController");
const CampaignLeadsController_1 = require("./controllers/CampaignLeadsController");
const GroupLeadsController_1 = require("./controllers/GroupLeadsController");
const router = (0, express_1.Router)();
exports.router = router;
const leadsController = new LeadsController_1.LeadsController();
const groupsController = new GroupsController_1.GroupsController();
const campaignsController = new CampaignsController_1.CampaignsController();
const campaignLeadsController = new CampaignLeadsController_1.CampaignLeadsController();
const groupLeadsController = new GroupLeadsController_1.GroupLeadsController();
//LEADS
router.get("/leads", leadsController.index);
router.post("/leads", leadsController.create);
router.get("/leads/:id", leadsController.show);
router.put("/leads/:id", leadsController.update);
router.delete("/leads/:id", leadsController.delete);
//GROUPS
router.get("/groups", groupsController.index);
router.get("/groups/:id", groupsController.show);
router.post("/groups", groupsController.create);
router.put("/groups/:id", groupsController.update);
router.delete("/groups/:id", groupsController.delete);
//CAMPAIGNS
router.get("/campaigns", campaignsController.index);
router.get("/campaigns/:id", campaignsController.show);
router.post("/campaigns", campaignsController.create);
router.put("/campaigns/:id", campaignsController.update);
router.delete("/campaigns/:id", campaignsController.delete);
//LEADCAMPAIGNS
router.get("/campaigns/:campaignId/leads", campaignLeadsController.getLeads);
router.post("/campaigns/:campaignId/leads", campaignLeadsController.addLead);
router.put("/campaigns/:campaignId/leads/:leadId", campaignLeadsController.updateLeadStatus);
router.delete("/campaigns/:campaignId/leads/:leadId", campaignLeadsController.removeLead);
//GROUPLEADS
router.get("/groups/:groupId/leads", groupLeadsController.getLeads);
router.post("/groups/:groupId/leads", groupLeadsController.addLead);
router.delete("/groups/:groupId/leads/:leadId", groupLeadsController.removeLead);
