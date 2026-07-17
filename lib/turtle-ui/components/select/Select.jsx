import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
} from "@floating-ui/react";
import { cn, inputboxVariants } from "../../utils";
import "./select.css";
import { useRef, useState } from "react";
import { Button } from "../button/Button";
import { IconCross } from "../../assets/icons/InterfaceIcons";
import { SearchBox } from "./components/SearchBox";
import { Loader } from "./components/Loader";
import { ClrBtn, DropdownIcon } from "./components/ClrBtn";

export const Select = ({
  labelKey = "", // required
  valueKey = "", // required
  options = [], // optional
  selectedOption = null, // optional
  placeholder = "Select an option", // optional // default

  // Actions

  render = null, // optional // default null
  renderOption = null, // optional // default null
  onSelect = undefined, // optional // default undefined
  onSelectOpen = undefined, // optional // default undefined
  onSearchChange = undefined, // optional // default undefined

  // Classnames

  selectedOptionClassName = "", // optional // default ""
  optionClassName = "", // optional // default ""
  optionContainerClassName = "", // optional // default ""
  className = "", // optional // default ""

  // Options
  showSearch = true, // optional // default true
  error = false, // optional // default false
  disabled = false, // optional // default false
  showClearBtn = true, // optional // default false
  isLoading = false, // optional // default false
  isMulti = false, // optional // default false
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: isSelectOpen,
    onOpenChange: (isOpen) => {
      setIsSelectOpen(isOpen);
      onSelectOpen?.(isOpen);
    },
    middleware: [
      offset(8),
      flip({
        fallbackPlacements: ["top-start"],
      }),
      size({
        apply({ rects, elements }) {
          elements.floating.style.width = `${rects.reference.width}px`;
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const searchRef = useRef(null);

  const dismiss = useDismiss(context);

  const click = useClick(context);

  const focus = useFocus(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    focus,
  ]);

  const hasSelectedOption = isMulti
    ? selectedOption?.length > 0
    : selectedOption?.[valueKey];

  const hasChecked = (currOption) => {
    if (isMulti) {
      return selectedOption?.some((option) => {
        return (
          option[valueKey] === currOption[valueKey] &&
          option[labelKey] === currOption[labelKey]
        );
      });
    }

    return (
      selectedOption?.[valueKey] === currOption[valueKey] &&
      selectedOption?.[labelKey] === currOption[labelKey]
    );
  };

  const handleSelectOption = (option = {}, isSelected = false) => {
    if (isMulti) {
      if (hasChecked(option)) {
        const updatedArr = [...selectedOption].filter((currOption) => {
          return !(
            currOption[labelKey] === option[labelKey] &&
            currOption[valueKey] === option[valueKey]
          );
        });
        onSelect?.(updatedArr);
      } else {
        onSelect?.([...selectedOption, option]);
      }
    } else {
      onSelect?.(hasChecked(option) ? {} : option, isSelected);
    }

    setIsSelectOpen(false);
  };

  const renderSelectedOption = () => {
    if (hasSelectedOption) {
      if (render) {
        return render?.(selectedOption);
      }

      if (isMulti) {
        return (
          <div
            className={cn(
              "tui-select-selected-option-multi",
              selectedOptionClassName,
            )}
          >
            {selectedOption?.map((option, index) => {
              return (
                <Button
                  key={index}
                  variant="tertiary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectOption(option, false);
                  }}
                  className="px-1 py-1 h-fit text-xs flex items-center gap-1 rounded-md bg-gray-50 flex-shrink-0"
                >
                  {option[labelKey] ? (
                    <p className="max-w-[100px] w-fit truncate ">
                      {option[labelKey]}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400">Not Available</p>
                  )}
                  <IconCross />
                </Button>
              );
            })}
          </div>
        );
      } else {
        return (
          <div
            className={cn(
              "tui-select-selected-option",
              selectedOptionClassName,
            )}
          >
            {selectedOption[labelKey]}
          </div>
        );
      }
    }

    return <div className="tui-placeholder-container">{placeholder}</div>;
  };

  return (
    <>
      {/* Reference element */}
      <div
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        role="button"
        className={cn(
          "tui-select",
          disabled && "tui-select-disabled",
          inputboxVariants({
            variant: error ? "danger" : "primary",
          }),
          className,
        )}
        ref={refs.setReference}
        // onClick={(e) => {
        //   alert("F")
        //   e.stopPropagation();
        //   setIsSelectOpen((v) => !v);
        // }}
        {...getReferenceProps({
          onClick: (e) => {
            e.stopPropagation(); // ⬅️ stop bubbling here
          },
        })}
      >
        {renderSelectedOption()}

        {hasSelectedOption && showClearBtn && (
          <ClrBtn onClick={(e) => {
            e.stopPropagation();
            onSelect?.(isMulti ? [] : null);
          }} />
        )}

        <DropdownIcon />
      </div>

      {/* Floating element */}

      {isSelectOpen && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            initialFocus={showSearch ? searchRef : null}
          >
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps({
                  onClick: (e) => e.stopPropagation(),
              })}
              className={cn("tui-select-options", optionContainerClassName)}
            >
              {showSearch && (
                <SearchBox
                  ref={searchRef}
                  onClick={(e) => e.stopPropagation()}
                  onSearchChange={(e) => {
                    onSearchChange?.(e);
                  }}
                />
              )}

              {/* Options container */}
              <div className="tui-select-options-container">
                {isLoading ? (
                  <Loader />
                ) : !options?.length ? (
                  <p className="tui-select-empty">No Items Found</p>
                ) : (
                  <>
                    {options.map((option, index) => {
                      let renderedOption = null;

                      const isSelected = hasChecked(option);

                      if (renderOption) {
                        renderedOption = renderOption(option, isSelected);
                        if (!renderedOption) return null;
                      }

                      return (
                        <div
                          role="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectOption(option, isSelected)
                          }}
                          key={index}
                          tabIndex="0"
                          className={cn(
                            `tui-select-option ${
                              isSelected
                                ? "tui-select-option-active"
                                : "tui-select-option-default"
                            }`,
                            optionClassName,
                          )}
                        >
                          {renderOption ? renderedOption : option[labelKey]}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
