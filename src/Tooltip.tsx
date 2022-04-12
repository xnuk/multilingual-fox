import type { Content } from './models';
import { styled } from 'jsx/styled';

const unsafeHTML = (html: string | undefined | null): HTMLElement[] | null => {
  if (html == null) return null;

  const parser = new DOMParser();

  let nodes: HTMLElement[];
  try {
    nodes = Array.from(
      parser.parseFromString(`<!doctype html><body>${html}`, 'text/html').body
        .childNodes
    ) as HTMLElement[];
  } catch (_) {
    return null;
  }

  const children = nodes.filter(
    (el) =>
      !['script', 'style', 'object', 'embed', 'img'].includes(
        el.nodeName.toLowerCase()
      )
  );

  return children;
};

const TooltipContainer = styled('div')({
  position: 'fixed',
  display: 'block',
  top: '5px',
  right: '5px',
  width: 'auto',
  height: 'auto',
  maxWidth: '250px',
  maxHeight: '120px',
  zIndex: '99999',
  margin: '0',
  padding: '3px',
  paddingRight: '30px',
  border: '1px #000000 solid',
  backgroundColor: '#ffffff',
  overflowY: 'auto',
  opacity: '0.9',
});

const NoResult = styled('p')({
  fontSize: '12px',
  fontWeight: 'normal',
  lineHeight: '15px',
  marginTop: '3px',
  marginBottom: '3px',
  color: '#000000',
  textAlign: 'left',
});

const lineHeight: Partial<CSSStyleDeclaration> = { lineHeight: '15px' };

const Title = styled('h1')({
  ...lineHeight,
  fontSize: '14px',
  fontWeight: 'normal',
  marginTop: '3px',
  marginBottom: '3px',
  color: '#000000',
  textAlign: 'left',
});

const descriptionStyle: Partial<CSSStyleDeclaration> = {
  ...lineHeight,
  fontSize: '12px',
  marginTop: '3px',
  marginBottom: '3px',
  color: '#000000',
  textAlign: 'left',
};

const Description = styled('p')(descriptionStyle);

const Example = styled('p')({
  ...descriptionStyle,
  fontStyle: 'italic',
  color: '#777777',
  textAlign: 'left',
});

const Separator = styled('div')({
  ...lineHeight,
  marginTop: '10px',
  marginBottom: '10px',
  textAlign: 'left',
});

const Definition = ({ content }: { content: Content }) => {
  return (
    <>
      <Title>
        {unsafeHTML(content.title)} {unsafeHTML(content.pronounce)}
      </Title>
      <Description>
        {content.part} {unsafeHTML(content.description)}
      </Description>
      {content.example != null ? (
        <>
          <Example>{unsafeHTML(content.example.sentence)}</Example>
          <Example>{unsafeHTML(content.example.meaning)}</Example>
        </>
      ) : null}
      <Separator />
    </>
  );
};

const Tooltip = ({ contents }: { contents: Promise<readonly Content[]> }) => (
  <TooltipContainer>
    {contents.then(
      (contents) => {
        const result = contents.map((content) => (
          <Definition content={content} />
        ));
        return result.length == 0 ? (
          <NoResult>검색결과가 없습니다.</NoResult>
        ) : (
          result
        );
      },
      () => (
        <NoResult>사전을 가져오지 못했습니다.</NoResult>
      )
    )}
  </TooltipContainer>
);

export class TooltipAttach {
  private dom: HTMLElement | null = null;

  public render(contents: Promise<readonly Content[]>) {
    const dom = <Tooltip contents={contents} />;
    document.body.appendChild(dom);
    this.dom = dom;
  }

  public hide() {
    if (this.dom != null) {
      document.body.removeChild(this.dom);
      this.dom = null;
    }
  }

  public getIsOpen() {
    return this.dom != null;
  }

  public getDOM() {
    return this.dom;
  }
}
