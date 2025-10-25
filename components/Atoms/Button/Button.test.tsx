import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/Atoms/Button/Button";

// Mock the CircularLoader component
jest.mock("@/components", () => ({
  CircularLoader: ({
    size,
    className,
  }: {
    size?: string;
    className?: string;
  }) => (
    <div data-testid="circular-loader" data-size={size} className={className}>
      Loading...
    </div>
  ),
}));

describe("Button Component", () => {
  const user = userEvent.setup();

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Click me");
    });

    it("renders with custom test id", () => {
      render(<Button data-testid="custom-button">Test Button</Button>);

      const button = screen.getByTestId("custom-button");
      expect(button).toBeInTheDocument();
    });

    it("renders as a different element when asChild is true", () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
    });
  });

  describe("Variants", () => {
    it("applies default variant styles", () => {
      render(<Button>Default Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-brand-dodger-blue");
    });

    it("applies destructive variant styles", () => {
      render(<Button variant="destructive">Delete</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-state-error");
    });

    it("applies outline variant styles", () => {
      render(<Button variant="outline">Outline Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "border",
        "border-neutral-300",
        "bg-transparent"
      );
    });

    it("applies ghost variant styles", () => {
      render(<Button variant="ghost">Ghost Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-transparent");
    });
  });

  describe("Sizes", () => {
    it("applies medium size by default", () => {
      render(<Button>Medium Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-10");
    });

    it("applies big size", () => {
      render(<Button size="big">Big Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-12");
    });

    it("applies small size", () => {
      render(<Button size="small">Small Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-8");
    });
  });

  describe("Width Variants", () => {
    it("applies large width", () => {
      render(<Button width="lg">Wide Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("min-w-[200px]");
    });

    it("applies medium width", () => {
      render(<Button width="md">Medium Width Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("min-w-[140px]");
    });
  });

  describe("Disabled State", () => {
    it("is disabled when disabled prop is true", () => {
      render(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("is disabled when loading prop is true", () => {
      render(<Button loading>Loading Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("applies disabled styles for default variant", () => {
      render(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-neutral-400");
    });

    it("applies disabled styles for outline variant", () => {
      render(
        <Button variant="outline" disabled>
          Disabled Outline
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("border-neutral-400", "text-neutral-400");
    });
  });

  describe("Loading State", () => {
    it("shows loading spinner when loading is true", () => {
      render(<Button loading>Loading Button</Button>);

      expect(screen.getByTestId("circular-loader")).toBeInTheDocument();
      expect(screen.queryByText("Loading Button")).not.toBeInTheDocument();
    });

    it("shows correct loader size for small button", () => {
      render(
        <Button loading size="small">
          Loading
        </Button>
      );

      const loader = screen.getByTestId("circular-loader");
      expect(loader).toHaveAttribute("data-size", "xs");
    });

    it("shows correct loader size for medium button", () => {
      render(
        <Button loading size="medium">
          Loading
        </Button>
      );

      const loader = screen.getByTestId("circular-loader");
      expect(loader).toHaveAttribute("data-size", "sm");
    });
  });

  describe("Icon Support", () => {
    const TestIcon = () => <span data-testid="test-icon">🎯</span>;

    it("renders icon on the left by default", () => {
      render(<Button icon={<TestIcon />}>With Icon</Button>);

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByText("With Icon")).toBeInTheDocument();
    });

    it("renders icon on the right when specified", () => {
      render(
        <Button icon={<TestIcon />} iconPosition="right">
          With Icon
        </Button>
      );

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByText("With Icon")).toBeInTheDocument();
    });

    it("renders icon-only button when iconPosition is only", () => {
      render(<Button icon={<TestIcon />} iconPosition="only" />);

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.queryByText("With Icon")).not.toBeInTheDocument();
    });

    it("renders icon-only button when no children but has icon", () => {
      render(<Button icon={<TestIcon />} />);

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("applies correct width for icon-only buttons", () => {
      render(<Button icon={<TestIcon />} iconPosition="only" size="big" />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("w-12");
    });
  });

  describe("Event Handling", () => {
    it("calls onClick handler when clicked", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Clickable</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const handleClick = jest.fn();
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when loading", async () => {
      const handleClick = jest.fn();
      render(
        <Button onClick={handleClick} loading>
          Loading
        </Button>
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has correct button type", () => {
      render(<Button type="submit">Submit</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("has correct default button type", () => {
      render(<Button>Default Type</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("supports custom className", () => {
      render(<Button className="custom-class">Custom</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children gracefully", () => {
      render(<Button></Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("handles undefined children", () => {
      render(<Button>{undefined}</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("combines multiple props correctly", () => {
      render(
        <Button
          variant="destructive"
          size="big"
          width="lg"
          disabled
          className="custom-class"
        >
          Complex Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "bg-state-error",
        "h-12",
        "min-w-[200px]",
        "custom-class"
      );
      expect(button).toBeDisabled();
    });
  });
});
