/*
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 科技内在设计（T-inside） is licensed under the MIT License.
 *
 * License for 科技内在设计（T-inside）:
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
*/

/**
 * @file v-click-outside-x
 * https://github.com/Xotic750/v-click-outside-x
 */

const CLICK = 'click'
const captureInstances = Object.create(null)
const nonCaptureInstances = Object.create(null)
const instancesList = [captureInstances, nonCaptureInstances]

/**
 * The common event handler for bot capture and non-capture events.
 *
 * @param {!Object} context - The event context.
 * @param {!Object} instances - The capture or non-capture registered instances.
 * @param {Event} event - The event object.
 */
const commonHandler = function _onCommonEvent (context, instances, event) {
    const { target } = event

    const itemIteratee = function _itemIteratee (item) {
        const { el } = item

        if (el !== target && !el.contains(target)) {
            const { binding } = item

            if (binding.modifiers.stop) {
                event.stopPropagation()
            }

            if (binding.modifiers.prevent) {
                event.preventDefault()
            }

            binding.value.call(context, event)
        }
    }

    const keysIteratee = function _keysIteratee (eventName) {
        return instances[eventName].forEach(itemIteratee)
    }

    Object.keys(instances).forEach(keysIteratee)
}

/**
 * Event handler for capture events.
 *
 * @param {Event} event - The event object.
 */
const captureEventHandler = function onCaptureEvent (event) {
    commonHandler(this, captureInstances, event)
}

/**
 * Event handler for non-capture events.
 *
 * @param {Event} event - The event object.
 */
const nonCaptureEventHandler = function onNonCaptureEvent (event) {
    commonHandler(this, nonCaptureInstances, event)
}

/**
 * Get the correct event handler: Capture or non-capture.
 *
 * @param {boolean} useCapture - Indicate which handler to use 'true' to use
 *  capture handler or 'false' for non-capture.
 * @returns {Function} - The event handler.
 */
const getEventHandler = function _getEventHandler (useCapture) {
    return useCapture ? captureEventHandler : nonCaptureEventHandler
}

/**
 * The directive definition.
 * {@link https://vuejs.org/v2/guide/custom-directive.html|Custom directive}
 *
 * @namespace
 * @property {!Object} $_captureInstances - Registered capture instances.
 * @property {!Object} $_nonCaptureInstances - Registered non-capture instances.
 * @property {Function} $_onCaptureEvent - Event handler for capture events.
 * @property {Function} $_onNonCaptureEvent - Event handler for non-capture events.
 * @property {Function} bind - Called only once, when the directive is first
 *  bound to the element.
 * @property {Function} unbind - Called only once, when the directive is unbound
 *  from the element.
 */
export const directive = Object.defineProperties(
    {},
    {
        $_captureInstances: {
            value: captureInstances
        },

        $_nonCaptureInstances: {
            value: nonCaptureInstances
        },

        $_onCaptureEvent: {
            value: captureEventHandler
        },

        $_onNonCaptureEvent: {
            value: nonCaptureEventHandler
        },

        bind: {
            value: function bind (el, binding) {
                if (typeof binding.value !== 'function') {
                    throw new TypeError('Binding value must be a function.')
                }

                const arg = binding.arg || CLICK
                const normalisedBinding = {
                    ...binding,
                    ...{
                        arg,
                        modifiers: {
                            ...{
                                capture: false,
                                prevent: false,
                                stop: false
                            },
                            ...binding.modifiers
                        }
                    }
                }

                const useCapture = normalisedBinding.modifiers.capture
                const instances = useCapture ? captureInstances : nonCaptureInstances

                if (!Array.isArray(instances[arg])) {
                    instances[arg] = []
                }

                if (instances[arg].push({ el, binding: normalisedBinding }) === 1) {
                    if (typeof document === 'object' && document) {
                        document.addEventListener(arg, getEventHandler(useCapture), useCapture)
                    }
                }
            }
        },

        unbind: {
            value: function unbind (el) {
                const compareElements = function _compareElements (item) {
                    return item.el !== el
                }

                const instancesIteratee = function _instancesIteratee (instances) {
                    const instanceKeys = Object.keys(instances)

                    if (instanceKeys.length) {
                        const useCapture = instances === captureInstances

                        const keysIteratee = function _keysIteratee (eventName) {
                            const newInstance = instances[eventName].filter(compareElements)

                            if (newInstance.length) {
                                instances[eventName] = newInstance
                            } else {
                                if (typeof document === 'object' && document) {
                                    document.removeEventListener(eventName, getEventHandler(useCapture), useCapture)
                                }

                                delete instances[eventName]
                            }
                        }

                        instanceKeys.forEach(keysIteratee)
                    }
                }

                instancesList.forEach(instancesIteratee)
            }
        }
    }
)

/**
 * @typedef {Function} Vue - The constructor.
 * @property {Function} directive - You can register a global custom directive
 *  with the Vue.directive() method, passing in a directiveID followed by a
 *  definition object.
 */

/**
 * A Vue.js plugin should expose an install method. The method will be called
 * with the Vue constructor as the first argument, along with possible options.
 * {@link https://vuejs.org/v2/guide/plugins.html#Writing-a-Plugin|Writing a plugin}.
 *
 * @param {Vue} Vue - The Vue function.
 */
export function install (Vue) {
    Vue.directive('click-outside', directive)
}
