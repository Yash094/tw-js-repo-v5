import { Highlight } from "prism-react-renderer";
import { cn } from "../../lib/utils";
import { CopyButton } from "./CopyButton";
import { Card } from "./card";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  canCopy?: boolean;
}

export const CodeBlock = ({
  code,
  language = "sh",
  canCopy = true,
}: CodeBlockProps) => {
  return (
    <Highlight code={code} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <Card className={className}>
          {canCopy && (
            <CopyButton text={code} className="float-right m-2 p-2" />
          )}

          <div
            className={cn(
              "block overflow-auto whitespace-pre-wrap p-4 font-mono text-sm",
              className,
            )}
          >
            {tokens.map((line, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: index IS the key here
              <div {...getLineProps({ line, key: i })} key={i}>
                {line.map((token, key) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: index IS the key here
                  <span {...getTokenProps({ token, key })} key={key} />
                ))}
              </div>
            ))}
          </div>
        </Card>
      )}
    </Highlight>
  );
};
