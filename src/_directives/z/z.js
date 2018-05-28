const Z = (el, binding) =>
{
    const arg = binding.arg;
    const value = binding.value;
    const modifiers = binding.modifiers;

    if (!isNaN(value))
    {
        el.style.zIndex = value;
    }
}

export default Z