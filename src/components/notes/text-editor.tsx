import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

export default function TextEditor({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="flex justify-between">
        <ContextMenuItem onClick={() => {}}>
          <p>H1</p>
        </ContextMenuItem>
        <ContextMenuItem>
          <p>
            <strong>B</strong>
          </p>
        </ContextMenuItem>
        <ContextMenuItem>
          <u>U</u>
        </ContextMenuItem>
        <ContextMenuItem>
          <em>I</em>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
