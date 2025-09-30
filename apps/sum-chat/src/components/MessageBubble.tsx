import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import type { SessionMessage } from '@/types/session';
import { useTheme } from './ThemeProvider';

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span
    className="inline-block text-xs rounded-full px-2 py-0.5 mr-1 bg-accent text-accent-foreground font-medium border border-accent"
    style={{ lineHeight: 1.5 }}
  >
    {children}
  </span>
);

// splitMarkdownBlocks and ensureTableSpacing are now imported from markdownUtils
import { splitMarkdownBlocks, ensureTableSpacing } from '@/lib/markdownUtils';

interface MessageBubbleProps {
  message: SessionMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  const { colors } = useTheme();

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  let badges = null;
  let content = message.content;
  let rhythm = null;

  // 플레이스홀더 메시지 구분: content에 <div 포함 시 뱃지/마크다운 렌더링 X
  if (!isUser && typeof content === 'string' && content.includes('<div')) {
    return (
      <div className={`flex justify-start`}>
        <div
          className="max-w-[768px] px-4 py-2"
          style={{ background: 'transparent', color: colors.aiBubbleText }}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <span className="text-xs text-muted-foreground mt-1 block justify-end">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  if (!isUser && typeof content === 'string') {
    let match = content.match(/\{[\s\S]*?\}/);
    if (!match && (message.tone || message.mode || message.tier)) {
      const rhythmObj = {
        tone: message.tone,
        mode: message.mode,
        tier: message.tier,
      };
      const rhythmStr = JSON.stringify(rhythmObj);
      content = `${rhythmStr}\n${content}`;
      match = content.match(/\{[\s\S]*?\}/);
    }
    if (match) {
      try {
        rhythm = JSON.parse(match[0]);
        content = content.replace(match[0], '').trim();
        if (!content && message.style?.minHeight) {
          content = ' ';
        } else if (!content) {
          content = '...';
        }
      } catch {}
    }
    if (!rhythm) {
      rhythm = {
        tone: message.tone,
        mode: message.mode,
        tier: message.tier,
      };
    }
    // 뱃지 렌더링 조건 강화: 값이 있을 때만
    badges = (
      <div style={{ marginBottom: 4 }}>
        {rhythm.tone && rhythm.tone !== 'undefined' && <Badge>{rhythm.tone}</Badge>}
        {rhythm.mode && rhythm.mode !== 'undefined' && <Badge>{rhythm.mode}</Badge>}
        {rhythm.tier && rhythm.tier !== 'undefined' && <Badge>{rhythm.tier}</Badge>}
      </div>
    );
    content = ensureTableSpacing(content);
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <div
          className="max-w-[540px] rounded-2xl px-4 py-2"
          style={{ background: colors.userBubbleBg, color: colors.userBubbleText }}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
          <span className="text-xs opacity-70 mt-1 block">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      ) : (
        <div
          className="max-w-[768px] px-4 py-2"
          style={{ background: 'transparent', color: colors.aiBubbleText }}
        >
          {badges}
          {content.includes('<div') ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            splitMarkdownBlocks(content).map((block, idx) => {
              const isTableBlock = /\|[^\n]*\|.*\n/.test(block.content);
              if (block.type === 'code') {
                return (
                  <div className="prose dark:prose-invert max-w-none my-2 text-sm leading-relaxed" key={idx}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {block.content}
                    </ReactMarkdown>
                  </div>
                );
              } else if (block.content.trim()) {
                return (
                  <div key={idx} className="prose dark:prose-invert max-w-none my-2 text-sm leading-relaxed">
                    <ReactMarkdown
                      remarkPlugins={isTableBlock ? [remarkGfm] : [remarkGfm, remarkBreaks]}
                    >
                      {block.content.trim()}
                    </ReactMarkdown>
                  </div>
                );
              } else {
                return null;
              }
            })
          )}
          <span className="text-xs text-muted-foreground mt-1 block justify-end">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageBubble; 