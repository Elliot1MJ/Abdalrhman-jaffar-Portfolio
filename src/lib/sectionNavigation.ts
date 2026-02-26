interface NavigateToSectionOptions {
    smooth?: boolean;
    clearHash?: boolean;
}

export function navigateToSection(
    sectionId: string,
    options: NavigateToSectionOptions = {},
) {
    const section = document.getElementById(sectionId);
    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: options.smooth === false ? "auto" : "smooth",
        block: "start",
    });

    const shouldClearHash = options.clearHash ?? true;
    if (shouldClearHash && window.location.hash) {
        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}`,
        );
    }
}
