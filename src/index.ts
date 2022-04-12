import { TooltipAttach } from './Tooltip';
import { query } from './dictionary';

const Tooltip = new TooltipAttach();

document.addEventListener('mouseup', (e) => {
  if (Tooltip.getIsOpen() && e.target !== Tooltip.getDOM()) {
    Tooltip.hide();
  }

  if (!Tooltip.getIsOpen() && e.altKey) {
    const word = document.getSelection()?.toString().trim();
    if (word != null && word.length > 0 && word.length < 40) {
      const result = query(word);
      if (result != null) {
        Tooltip.render(result);
      }
    }
  }
});
