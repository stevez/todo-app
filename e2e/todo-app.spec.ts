import { test, expect } from "./fixtures";

import {
    overrideResponse,
    resetOverrideResponse,
    resetDB,
} from "./mock-server-api";

test.describe("ToDo App", () => {
    test.beforeEach(async ({ page, request }, testInfo) => {
        const customHeaders = {
            "x-parallel-index": testInfo.parallelIndex.toString(),
        };
        await page.setExtraHTTPHeaders(customHeaders);
        await resetOverrideResponse(request, customHeaders);
        await resetDB(request, customHeaders);
    });


    test("list when empty tasks", async ({ page, request}, testInfo) => {
        const customHeaders = {
            "x-parallel-index": testInfo.parallelIndex.toString(),
        };
        await overrideResponse(request, {
            method: "GET",
            url: "/tasks",
            response: {
                status: 200,
                body: [],
            },
        }, customHeaders);

        await page.goto("/");
        await expect(
            page.getByRole("heading", { name: "ToDo List" })
        ).toBeVisible();
        await expect(page.getByText("No task")).toBeVisible();
    });

    test("edit task", async ({ page }) => {
        await page.goto("/");
        await page
            .getByRole("cell", { name: "✕ Edit Task HackerRank" })
            .getByRole("img")
            .first()
            .click();
        await page
            .getByRole("cell", { name: "✕ Edit Task HackerRank" })
            .getByPlaceholder("Type here")
            .fill("Read Revenge of The tipping point");
        await page.getByRole("button", { name: "Submit" }).nth(1).click();
        await expect(page.getByText("Read Revenge of The tipping")).toBeVisible();
    });

    test("delete task", async ({ page }) => {
        await page.goto("/");
        await page
            .getByRole("cell", { name: "✕ Edit Task write an article" })
            .getByRole("img")
            .nth(1)
            .click();
        await page.getByRole("button", { name: "Yes" }).nth(2).click();
        await expect(page.getByText("write an article")).not.toBeVisible();
    });

    test("delete task - cancel the modal", async ({ page }) => {
        await page.goto("/");
        await page
            .getByRole("row", { name: "Join the progress review" })
            .getByRole("img")
            .nth(1)
            .click();
        await page
            .getByRole("row", { name: "Join the progress review" })
            .locator("label")
            .nth(1)
            .click();
        await expect(page.getByText("Join the progress review")).toBeVisible();
    });

    test("finish a task", async ({ page }) => {
        await page.goto("/");
        await page
            .getByRole("row", { name: "HackerRank Problem solving" })
            .getByRole("checkbox")
            .check();
        await expect(page.getByText("HackerRank Problem solving")).toBeVisible();
        await expect(
            page
                .getByRole("row", { name: "HackerRank Problem solving" })
                .getByRole("checkbox")
        ).toBeChecked();
    });
});
