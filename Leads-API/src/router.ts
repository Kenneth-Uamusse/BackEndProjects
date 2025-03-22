import { Router } from "express";
import { campaignLeadsController, campaignsController, groupLeadsController, groupsController, leadsController } from "./container";

const router = Router();

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
router.put(
  "/campaigns/:campaignId/leads/:leadId",
  campaignLeadsController.updateLeadStatus
);
router.delete(
  "/campaigns/:campaignId/leads/:leadId",
  campaignLeadsController.removeLead
);

//GROUPLEADS
router.get("/groups/:groupId/leads", groupLeadsController.getLeads);
router.post("/groups/:groupId/leads", groupLeadsController.addLead);
router.delete(
  "/groups/:groupId/leads/:leadId",
  groupLeadsController.removeLead
);

export { router };
