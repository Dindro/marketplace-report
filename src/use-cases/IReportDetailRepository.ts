import type ReportAction from "@/entities/ReportAction";

export interface IReportDetailRepository {
    getList(): Promise<ReportAction[]>;
}