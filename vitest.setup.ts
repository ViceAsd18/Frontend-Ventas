import '@testing-library/jest-dom';

// Polyfill para `window.matchMedia` usado por Ant Design (responsiveObserver)
// Evita el error: "TypeError: window.matchMedia is not a function" en jsdom
if (typeof window !== 'undefined' && !window.matchMedia) {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: (query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		}),
	});
}

import React from 'react';
import { vi } from 'vitest';

// Global lightweight mock for `antd` to provide commonly used subcomponents
vi.mock('antd', () => {
	const React = require('react');

	const Typography = {
		Text: (props: any) => React.createElement('span', props, props.children),
	};

	const Tag = ({ children, color, ...rest }: any) => React.createElement('span', { 'data-testid': 'ant-tag', 'data-color': color, ...rest }, children);

	const Spin = ({ children }: any) => React.createElement('div', {}, children);

	const Space = ({ children }: any) => React.createElement('div', {}, children);

	const List = ({ children }: any) => React.createElement('div', {}, children);

	const Card = ({ children }: any) => React.createElement('div', { 'data-testid': 'ant-card' }, children);

	const Row = ({ children, align, gutter }: any) => React.createElement('div', { 'data-testid': 'ant-row', 'data-align': align, 'data-gutter': JSON.stringify(gutter) }, children);

	const Col = ({ children, xs, sm, style }: any) => React.createElement('div', { 'data-testid': 'ant-col', 'data-xs': xs, 'data-sm': sm, style }, children);

	const Header = ({ children }: any) => React.createElement('header', { 'data-testid': 'header' }, children);
	const Content = ({ children }: any) => React.createElement('main', { 'data-testid': 'content' }, children);
	const Footer = ({ children }: any) => React.createElement('footer', { 'data-testid': 'footer' }, children);
	const Sider = ({ children }: any) => React.createElement('aside', { 'data-testid': 'sider' }, children);

	const Layout = ({ children }: any) => React.createElement('div', { 'data-testid': 'layout-root' }, children);
	(Layout as any).Header = Header;
	(Layout as any).Content = Content;
	(Layout as any).Footer = Footer;
	(Layout as any).Sider = Sider;

	const Menu = ({ items }: any) => React.createElement('nav', {}, items && items.map((it: any) => React.createElement('button', { key: it.key, onClick: it.onClick }, it.label)));
	const Button = ({ children, onClick, icon, type, htmlType, loading }: any) => React.createElement('button', { onClick, type: htmlType || 'button' }, children ?? (icon ? 'icon' : ''));
	const Badge = ({ children }: any) => React.createElement('span', {}, children);

	// Form primitives used in tests may mock these, but provide fallbacks
	// Implement a lightweight <form> wrapper that maps `onFinish` -> `onSubmit`
	// and extracts values from the DOM so tests can assert onFinish behavior.
	const Form = (props: any) => {
		const { onFinish, initialValues, children, ...rest } = props;

		const handleSubmit = (e: any) => {
			if (e && e.preventDefault) e.preventDefault();
			if (typeof onFinish === 'function') {
				try {
					const form = e && e.target ? e.target : null;
					const values: any = {};

					if (form && typeof FormData !== 'undefined') {
						const fd = new FormData(form as HTMLFormElement);
						for (const [k, v] of fd.entries()) {
							// convert numeric-like values to numbers
							const str = String(v);
							const num = Number(str);
							values[k] = str === '' ? '' : (String(num) === str ? num : str);
						}
					}

					const merged = { ...(initialValues || {}), ...values };
					onFinish(merged);
				} catch (_err) {
					// swallow errors in the mock to avoid crashing tests
					onFinish(initialValues || {});
				}
			}
		};

		return React.createElement('form', { onSubmit: handleSubmit, ...rest }, children);
	};
	(Form as any).Item = ({ children, name }: any) => {
		// Ensure the child DOM element receives the `name` attribute so FormData picks it up
		const child = React.Children.only(children) as any;
		return React.cloneElement(child, { name: child.props?.name || name });
	};

	// Minimal implementation of Form.useForm to satisfy components that call `const [form] = Form.useForm()`
	(Form as any).useForm = () => {
		const formApi = {
			getFieldValue: (name: string) => undefined,
			getFieldsValue: () => ({}),
			setFieldsValue: (_: any) => {},
			resetFields: () => {},
			validateFields: async () => ({}),
		};

		return [formApi];
	};
	const Input = (props: any) => React.createElement('input', props);
	(Input as any).TextArea = (props: any) => React.createElement('textarea', props);
	(Input as any).Password = (props: any) => React.createElement('input', { type: 'password', ...props });
	const InputNumber = (props: any) => React.createElement('input', { type: 'number', ...props });
	const Select: any = ({ children, ...rest }: any) => React.createElement('select', rest, children);
	(Select as any).Option = ({ value, children }: any) => React.createElement('option', { value }, children);

	const Image = ({ src, alt, width, height, style }: any) => React.createElement('img', { src, alt, width, height, style });

	// message will be mocked on-demand in tests; provide safe no-op defaults
	const message = { loading: vi.fn(() => vi.fn()), success: vi.fn(), error: vi.fn() };

	return {
		__esModule: true,
		Typography,
		Tag,
		Spin,
		Space,
		List,
		Card,
		Row,
		Col,
		Layout,
		Menu,
		Button,
		Badge,
		Form,
		Input,
		InputNumber,
		Select,
		Image,
		message,
	};
});

// Global mock for auth context to avoid errors when components expect AuthProvider
vi.mock('auth/AuthContext', () => ({ __esModule: true, useAuth: () => ({ login: vi.fn(), logout: vi.fn(), user: null }) }));
