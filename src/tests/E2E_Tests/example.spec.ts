import { test, expect, type Page } from "@playwright/test";
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
] as const;

test.describe("New Todo", () => {
  test("should allow me to add todo items", async ({ page }) => {
    await allure.severity(Severity.CRITICAL);
    await allure.step("Create a new todo locator", async () => {
      const newTodo = page.getByPlaceholder("What needs to be done?");

      await allure.step("Create 1st todo item", async () => {
        await newTodo.fill(TODO_ITEMS[0]);
        await newTodo.press("Enter");
      });

      await allure.step("Verify the list has one todo item", async () => {
        await expect(page.getByTestId("todo-title")).toHaveText([
          TODO_ITEMS[0],
        ]);
      });

      await allure.step("Create 2nd todo item", async () => {
        await newTodo.fill(TODO_ITEMS[1]);
        await newTodo.press("Enter");
      });

      await allure.step("Verify the list has two todo items", async () => {
        await expect(page.getByTestId("todo-title")).toHaveText([
          TODO_ITEMS[0],
          TODO_ITEMS[1],
        ]);
      });

      await allure.step("Check number of todos in local storage", async () => {
        await checkNumberOfTodosInLocalStorage(page, 2);
      });
    });
  });

  test("should clear text input field when an item is added", async ({
    page,
  }) => {
    await allure.step("Create a new todo locator", async () => {
      const newTodo = page.getByPlaceholder("What needs to be done?");

      await allure.step("Create one todo item", async () => {
        await newTodo.fill(TODO_ITEMS[0]);
        await newTodo.press("Enter");
      });

      await allure.step("Check that input is empty", async () => {
        await expect(newTodo).toBeEmpty();
        await checkNumberOfTodosInLocalStorage(page, 1);
      });
    });
  });

  test("should append new items to the bottom of the list", async ({
    page,
  }) => {
    await allure.step("Create 3 items", async () => {
      await createDefaultTodos(page);

      const todoCount = page.getByTestId("todo-count");

      await allure.step("Check test using different methods", async () => {
        await expect(page.getByText("3 items left")).toBeVisible();
        await expect(todoCount).toHaveText("3 items left");
        await expect(todoCount).toContainText("3");
        await expect(todoCount).toHaveText(/3/);
      });

      await allure.step("Check all items in one call", async () => {
        await expect(page.getByTestId("todo-title")).toHaveText(TODO_ITEMS);
        await checkNumberOfTodosInLocalStorage(page, 3);
      });
    });
  });
});

test.describe("Mark all as completed", () => {
  test.beforeEach(async ({ page }) => {
    await allure.step(
      "Create default todos and check number of todos in local storage",
      async () => {
        await createDefaultTodos(page);
        await checkNumberOfTodosInLocalStorage(page, 3);
      }
    );
  });

  test.afterEach(async ({ page }) => {
    await allure.step("Check number of todos in local storage", async () => {
      await checkNumberOfTodosInLocalStorage(page, 3);
    });
  });

  test("should allow me to mark all items as completed", async ({ page }) => {
    await allure.step("Complete all todos", async () => {
      await page.getByLabel("Mark all as complete").check();
    });

    await allure.step('Ensure all todos have "completed" class', async () => {
      await expect(page.getByTestId("todo-item")).toHaveClass([
        "completed",
        "completed",
        "completed",
      ]);
      await checkNumberOfCompletedTodosInLocalStorage(page, 3);
    });
  });

  test("should allow me to clear the complete state of all items", async ({
    page,
  }) => {
    await allure.step(
      'Check and then immediately uncheck "Mark all as complete"',
      async () => {
        const toggleAll = page.getByLabel("Mark all as complete");
        await toggleAll.check();
        await toggleAll.uncheck();
      }
    );

    await allure.step('Ensure no todos have "completed" class', async () => {
      await expect(page.getByTestId("todo-item")).toHaveClass(["", "", ""]);
    });
  });

  test("complete all checkbox should update state when items are completed / cleared", async ({
    page,
  }) => {
    await allure.step('Check "Mark all as complete"', async () => {
      const toggleAll = page.getByLabel("Mark all as complete");
      await toggleAll.check();
      await expect(toggleAll).toBeChecked();
      await checkNumberOfCompletedTodosInLocalStorage(page, 3);
    });

    await allure.step(
      'Uncheck first todo and ensure "Mark all as complete" is not checked',
      async () => {
        const firstTodo = page.getByTestId("todo-item").nth(0);
        await firstTodo.getByRole("checkbox").uncheck();
        await expect(page.getByLabel("Mark all as complete")).not.toBeChecked();
      }
    );

    await allure.step(
      'Check first todo again and ensure "Mark all as complete" is checked',
      async () => {
        const firstTodo = page.getByTestId("todo-item").nth(0);
        await firstTodo.getByRole("checkbox").check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 3);
        await expect(page.getByLabel("Mark all as complete")).toBeChecked();
      }
    );
  });
});

test.describe("Item", () => {
  test("should allow me to mark items as complete", async ({ page }) => {
    await allure.step(
      "Create a new todo locator and add two items",
      async () => {
        const newTodo = page.getByPlaceholder("What needs to be done?");
        for (const item of TODO_ITEMS.slice(0, 2)) {
          await newTodo.fill(item);
          await newTodo.press("Enter");
        }
      }
    );

    await allure.step("Check first item", async () => {
      const firstTodo = page.getByTestId("todo-item").nth(0);
      await firstTodo.getByRole("checkbox").check();
      await expect(firstTodo).toHaveClass("completed");
    });

    await allure.step("Check second item", async () => {
      const secondTodo = page.getByTestId("todo-item").nth(1);
      await expect(secondTodo).not.toHaveClass("completed");
      await secondTodo.getByRole("checkbox").check();
      await expect(secondTodo).toHaveClass("completed");
    });

    await allure.step("Assert completed class for both items", async () => {
      const firstTodo = page.getByTestId("todo-item").nth(0);
      const secondTodo = page.getByTestId("todo-item").nth(1);
      await expect(firstTodo).toHaveClass("completed");
      await expect(secondTodo).toHaveClass("completed");
    });
  });

  test("should allow me to un-mark items as complete", async ({ page }) => {
    await allure.step(
      "Create a new todo locator and add two items",
      async () => {
        const newTodo = page.getByPlaceholder("What needs to be done?");
        for (const item of TODO_ITEMS.slice(0, 2)) {
          await newTodo.fill(item);
          await newTodo.press("Enter");
        }
      }
    );

    await allure.step("Check first item and verify its class", async () => {
      const firstTodo = page.getByTestId("todo-item").nth(0);
      const secondTodo = page.getByTestId("todo-item").nth(1);
      const firstTodoCheckbox = firstTodo.getByRole("checkbox");

      await firstTodoCheckbox.check();
      await expect(firstTodo).toHaveClass("completed");
      await expect(secondTodo).not.toHaveClass("completed");
      await checkNumberOfCompletedTodosInLocalStorage(page, 1);

      await firstTodoCheckbox.uncheck();
      await expect(firstTodo).not.toHaveClass("completed");
      await expect(secondTodo).not.toHaveClass("completed");
      await checkNumberOfCompletedTodosInLocalStorage(page, 0);
    });
  });

  test("should allow me to edit an item", async ({ page }) => {
    await allure.step("Create default todos", async () => {
      await createDefaultTodos(page);
    });

    await allure.step("Edit second todo item", async () => {
      const todoItems = page.getByTestId("todo-item");
      const secondTodo = todoItems.nth(1);
      await secondTodo.dblclick();
      await expect(
        secondTodo.getByRole("textbox", { name: "Edit" })
      ).toHaveValue(TODO_ITEMS[1]);
      await secondTodo
        .getByRole("textbox", { name: "Edit" })
        .fill("buy some sausages");
      await secondTodo.getByRole("textbox", { name: "Edit" }).press("Enter");

      // Explicitly assert the new text value.
      await expect(todoItems).toHaveText([
        TODO_ITEMS[0],
        "buy some sausages",
        TODO_ITEMS[2],
      ]);
      await checkTodosInLocalStorage(page, "buy some sausages");
    });
  });
});

test.describe("Editing", () => {
  test.beforeEach(async ({ page }) => {
    await allure.step(
      "Create default todos and check number of todos in local storage",
      async () => {
        await createDefaultTodos(page);
        await checkNumberOfTodosInLocalStorage(page, 3);
      }
    );
  });

  test("should hide other controls when editing", async ({ page }) => {
    await allure.step("Double click second todo item to edit", async () => {
      const todoItem = page.getByTestId("todo-item").nth(1);
      await todoItem.dblclick();
    });

    await allure.step(
      "Check that other controls are hidden when editing",
      async () => {
        const todoItem = page.getByTestId("todo-item").nth(1);
        await expect(todoItem.getByRole("checkbox")).not.toBeVisible();
        await expect(
          todoItem.locator("label", {
            hasText: TODO_ITEMS[1],
          })
        ).not.toBeVisible();
        await checkNumberOfTodosInLocalStorage(page, 3);
      }
    );
  });

  test("should save edits on blur", async ({ page }) => {
    await allure.step("Double click second todo item to edit", async () => {
      const todoItems = page.getByTestId("todo-item");
      await todoItems.nth(1).dblclick();
    });

    await allure.step("Edit the text and trigger blur", async () => {
      const todoItems = page.getByTestId("todo-item");
      await todoItems
        .nth(1)
        .getByRole("textbox", { name: "Edit" })
        .fill("buy some sausages");
      await todoItems
        .nth(1)
        .getByRole("textbox", { name: "Edit" })
        .dispatchEvent("blur");
    });

    await allure.step("Verify that the edit was saved", async () => {
      const todoItems = page.getByTestId("todo-item");
      await expect(todoItems).toHaveText([
        TODO_ITEMS[0],
        "buy some sausages",
        TODO_ITEMS[2],
      ]);
      await checkTodosInLocalStorage(page, "buy some sausages");
    });
  });

  test("should trim entered text", async ({ page }) => {
    await allure.step("Double click second todo item to edit", async () => {
      const todoItems = page.getByTestId("todo-item");
      await todoItems.nth(1).dblclick();
    });

    await allure.step("Edit the text with spaces and press Enter", async () => {
      const todoItems = page.getByTestId("todo-item");
      await todoItems
        .nth(1)
        .getByRole("textbox", { name: "Edit" })
        .fill("    buy some sausages    ");
      await todoItems
        .nth(1)
        .getByRole("textbox", { name: "Edit" })
        .press("Enter");
    });

    await allure.step("Verify that the text was trimmed", async () => {
      const todoItems = page.getByTestId("todo-item");
      await expect(todoItems).toHaveText([
        TODO_ITEMS[0],
        "buy some sausages",
        TODO_ITEMS[2],
      ]);
      await checkTodosInLocalStorage(page, "buy some sausages");
    });
  });

  test("should remove the item if an empty text string was entered", async ({
    page,
  }) => {
    await allure.step("Double click second todo item to edit", async () => {
      const todoItems = page.getByTestId("todo-item");
      await todoItems.nth(1).dblclick();
    });

    await allure.step("Enter empty text and press Enter", async () => {
      const todoItems = page.getByTestId("todo-item");
      await todoItems.nth(1).getByRole("textbox", { name: "Edit" }).fill("");
      await todoItems
        .nth(1)
        .getByRole("textbox", { name: "Edit" })
        .press("Enter");
    });

    await allure.step("Verify that the item was removed", async () => {
      const todoItems = page.getByTestId("todo-item");
      await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    });
  });

  test("should cancel edits on escape", async ({ page }) => {
    await allure.step("Double click second todo item to edit", async () => {
      const todoItems = page.getByTestId("todo-item");
      await todoItems.nth(1).dblclick();
    });

    await allure.step("Edit the text and press Escape", async () => {
      const todoItems = page.getByTestId("todo-item");
      await todoItems
        .nth(1)
        .getByRole("textbox", { name: "Edit" })
        .fill("buy some sausages");
      await todoItems
        .nth(1)
        .getByRole("textbox", { name: "Edit" })
        .press("Escape");
    });

    await allure.step("Verify that the edit was canceled", async () => {
      const todoItems = page.getByTestId("todo-item");
      await expect(todoItems).toHaveText(TODO_ITEMS);
    });
  });
});

test.describe("Counter", () => {
  test("should display the current number of todo items", async ({ page }) => {
    await allure.step(
      "Create a new todo locator and a todo count locator",
      async () => {
        const newTodo = page.getByPlaceholder("What needs to be done?");
        const todoCount = page.getByTestId("todo-count");
      }
    );

    await allure.step("Add first todo item and check count", async () => {
      const newTodo = page.getByPlaceholder("What needs to be done?");
      const todoCount = page.getByTestId("todo-count");
      await newTodo.fill(TODO_ITEMS[0]);
      await newTodo.press("Enter");
      await expect(todoCount).toContainText("1");
    });

    await allure.step("Add second todo item and check count", async () => {
      const newTodo = page.getByPlaceholder("What needs to be done?");
      const todoCount = page.getByTestId("todo-count");
      await newTodo.fill(TODO_ITEMS[1]);
      await newTodo.press("Enter");
      await expect(todoCount).toContainText("2");
    });

    await allure.step("Check number of todos in local storage", async () => {
      await checkNumberOfTodosInLocalStorage(page, 2);
    });
  });
});

test.describe("Clear completed button", () => {
  test.beforeEach(async ({ page }) => {
    await allure.step("Create default todos", async () => {
      await createDefaultTodos(page);
    });
  });

  test("should display the correct text", async ({ page }) => {
    await allure.step("Check the first todo item", async () => {
      await page.locator(".todo-list li .toggle").first().check();
    });

    await allure.step(
      'Verify that the "Clear completed" button is visible',
      async () => {
        await expect(
          page.getByRole("button", { name: "Clear completed" })
        ).toBeVisible();
      }
    );
  });

  test("should remove completed items when clicked", async ({ page }) => {
    await allure.step("Check the second todo item", async () => {
      const todoItems = page.getByTestId("todo-item");
      await todoItems.nth(1).getByRole("checkbox").check();
    });

    await allure.step('Click the "Clear completed" button', async () => {
      await page.getByRole("button", { name: "Clear completed" }).click();
    });

    await allure.step(
      "Verify that the completed items are removed",
      async () => {
        const todoItems = page.getByTestId("todo-item");
        await expect(todoItems).toHaveCount(2);
        await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
      }
    );
  });

  test("should be hidden when there are no items that are completed", async ({
    page,
  }) => {
    await allure.step(
      'Check the first todo item and click "Clear completed" button',
      async () => {
        await page.locator(".todo-list li .toggle").first().check();
        await page.getByRole("button", { name: "Clear completed" }).click();
      }
    );

    await allure.step(
      'Verify that the "Clear completed" button is hidden',
      async () => {
        await expect(
          page.getByRole("button", { name: "Clear completed" })
        ).toBeHidden();
      }
    );
  });
});

test.describe("Persistence", () => {
  test("should persist its data", async ({ page }) => {
    await allure.step(
      "Create a new todo locator and add two items",
      async () => {
        const newTodo = page.getByPlaceholder("What needs to be done?");
        for (const item of TODO_ITEMS.slice(0, 2)) {
          await newTodo.fill(item);
          await newTodo.press("Enter");
        }
      }
    );

    await allure.step(
      "Check the first todo item and verify its class",
      async () => {
        const todoItems = page.getByTestId("todo-item");
        const firstTodoCheck = todoItems.nth(0).getByRole("checkbox");
        await firstTodoCheck.check();
        await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
        await expect(firstTodoCheck).toBeChecked();
        await expect(todoItems).toHaveClass(["completed", ""]);
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);
      }
    );

    await allure.step("Reload the page and verify persisted data", async () => {
      await page.reload();
      const todoItems = page.getByTestId("todo-item");
      const firstTodoCheck = todoItems.nth(0).getByRole("checkbox");
      await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
      await expect(firstTodoCheck).toBeChecked();
      await expect(todoItems).toHaveClass(["completed", ""]);
    });
  });
});

test.describe("Routing", () => {
  test.beforeEach(async ({ page }) => {
    await allure.step("Create default todos and verify storage", async () => {
      await createDefaultTodos(page);
      await checkTodosInLocalStorage(page, TODO_ITEMS[0]);
    });
  });

  test("should allow me to display active items", async ({ page }) => {
    await allure.step(
      "Check the second todo item and verify active items",
      async () => {
        const todoItem = page.getByTestId("todo-item");
        await page
          .getByTestId("todo-item")
          .nth(1)
          .getByRole("checkbox")
          .check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);
        await page.getByRole("link", { name: "Active" }).click();
        await expect(todoItem).toHaveCount(2);
        await expect(todoItem).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
      }
    );
  });

  test("should respect the back button", async ({ page }) => {
    await allure.step(
      "Check the second todo item and navigate through filters",
      async () => {
        const todoItem = page.getByTestId("todo-item");
        await page
          .getByTestId("todo-item")
          .nth(1)
          .getByRole("checkbox")
          .check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);

        await test.step("Showing all items", async () => {
          await page.getByRole("link", { name: "All" }).click();
          await expect(todoItem).toHaveCount(3);
        });

        await test.step("Showing active items", async () => {
          await page.getByRole("link", { name: "Active" }).click();
        });

        await test.step("Showing completed items", async () => {
          await page.getByRole("link", { name: "Completed" }).click();
        });

        await expect(todoItem).toHaveCount(1);
        await page.goBack();
        await expect(todoItem).toHaveCount(2);
        await page.goBack();
        await expect(todoItem).toHaveCount(3);
      }
    );
  });

  test("should allow me to display completed items", async ({ page }) => {
    await allure.step(
      "Check the second todo item and verify completed items",
      async () => {
        await page
          .getByTestId("todo-item")
          .nth(1)
          .getByRole("checkbox")
          .check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);
        await page.getByRole("link", { name: "Completed" }).click();
        await expect(page.getByTestId("todo-item")).toHaveCount(1);
      }
    );
  });

  test("should allow me to display all items", async ({ page }) => {
    await allure.step(
      "Check the second todo item and verify all items",
      async () => {
        await page
          .getByTestId("todo-item")
          .nth(1)
          .getByRole("checkbox")
          .check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);
        await page.getByRole("link", { name: "Active" }).click();
        await page.getByRole("link", { name: "Completed" }).click();
        await page.getByRole("link", { name: "All" }).click();
        await expect(page.getByTestId("todo-item")).toHaveCount(3);
      }
    );
  });

  test("should highlight the currently applied filter", async ({ page }) => {
    await allure.step(
      'Verify "All" filter is selected by default',
      async () => {
        await expect(page.getByRole("link", { name: "All" })).toHaveClass(
          "selected"
        );
      }
    );

    await allure.step(
      "Create locators for active and completed links and verify their selection",
      async () => {
        const activeLink = page.getByRole("link", { name: "Active" });
        const completedLink = page.getByRole("link", { name: "Completed" });

        await activeLink.click();
        await expect(activeLink).toHaveClass("selected");

        await completedLink.click();
        await expect(completedLink).toHaveClass("selected");
      }
    );
  });
});

async function createDefaultTodos(page: Page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder("What needs to be done?");

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press("Enter");
  }
}

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction((e) => {
    return JSON.parse(localStorage["react-todos"]).length === e;
  }, expected);
}

async function checkNumberOfCompletedTodosInLocalStorage(
  page: Page,
  expected: number
) {
  return await page.waitForFunction((e) => {
    return (
      JSON.parse(localStorage["react-todos"]).filter(
        (todo: any) => todo.completed
      ).length === e
    );
  }, expected);
}

async function checkTodosInLocalStorage(page: Page, title: string) {
  return await page.waitForFunction((t) => {
    return JSON.parse(localStorage["react-todos"])
      .map((todo: any) => todo.title)
      .includes(t);
  }, title);
}
