import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Home/Dashboard.vue";
import AllAccounts from "@/views/Account/Account.vue";
import FreelancerVerification from "@/views/Account/Freelancer.vue";
import PendingTransactions from "@/views/Transaction/Pending.vue";
import TransactionHistory from "@/views/Transaction/TransactionHistory.vue";
import JobPostings from "@/views/Post/JobPosing/JobPosting.vue";
import ServicePostings from "@/views/Post/ServicePosting/ServicePosting.vue";
import RatingsFeedback from "@/views/RatingFeedback/RatingFeedback.vue";
import AccountSettings from "@/views/Setting/AccountSetting/AccountSetting.vue";
import ContentManagement from "@/views/Setting/ContentManagement/ContentManagement.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/account",
    name: "AllAccounts",
    component: AllAccounts,
  },
  {
    path: "/freelancer-verification",
    name: "FreelancerVerification",
    component: FreelancerVerification,
  },
  {
    path: "/pending-transactions",
    name: "PendingTransactions",
    component: PendingTransactions,
  },
  {
    path: "/transaction-history",
    name: "TransactionHistory",
    component: TransactionHistory,
  },
  {
    path: "/job-postings",
    name: "JobPostings",
    component: JobPostings,
  },
  {
    path: "/service-postings",
    name: "ServicePostings",
    component: ServicePostings,
  },
  {
    path: "/ratings-feedback",
    name: "RatingsFeedback",
    component: RatingsFeedback,
  },
  {
    path: "/account-settings",
    name: "AccountSettings",
    component: AccountSettings,
  },
  {
    path: "/content-management",
    name: "ContentManagement",
    component: ContentManagement,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
