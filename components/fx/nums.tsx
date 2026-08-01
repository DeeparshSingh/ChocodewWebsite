/**
 * Renders text with any digit runs set in the sans stack. Playfair's figures
 * read as dated, so numerals stay Helvetica even inside a serif heading.
 */
export function Nums({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\d[\d,.:]*)/g).map((part, i) =>
        /^\d/.test(part) ? (
          <span key={i} className="cd-num font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
