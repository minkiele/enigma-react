import { Enigma as e, EnigmaM4 as t, ReflectorA as n, ReflectorB as r, ReflectorBeta as i, ReflectorC as a, ReflectorD as o, ReflectorGamma as ee, RotorI as s, RotorII as te, RotorIII as ne, RotorIV as re, RotorV as ie, RotorVI as ae, RotorVII as oe, RotorVIII as se, ThinReflectorB as ce, ThinReflectorC as le, ThinRotorBeta as ue, ThinRotorGamma as de, Uhr as c } from "enigma-minkiele";
import { useCallback as l, useDebugValue as fe, useRef as u } from "react";
import { create as d } from "zustand";
import { produce as f } from "immer";
var p = (e) => (t, n, r) => (r.setState = (e, n, ...r) => t(typeof e == "function" ? f(e) : e, n, ...r), e(r.setState, n, r)), m = {
	type: "M3",
	reflector: void 0,
	fourthRotor: void 0,
	leftRotor: void 0,
	centerRotor: void 0,
	rightRotor: void 0,
	wirings: [],
	uhrSetting: void 0,
	input: "",
	output: "",
	history: []
}, h = (n) => {
	switch (n) {
		case "fourth": return t.FOURTH_ROTOR;
		case "left": return e.LEFT_ROTOR;
		case "center": return e.CENTER_ROTOR;
		case "right": return e.RIGHT_ROTOR;
	}
}, g = ["Thin B", "Thin C"], _ = (e) => (t) => !(e[0] === t[0] && e[1] === t[1] || e[0] === t[1] && e[1] === t[0]), v = (e, t) => {
	if (e.history.length > 0 && t >= 0 && t < e.history.length) {
		let n = e.history[t];
		n && (e.fourthRotor && n.fourth && (e.fourthRotor.windowLetter = n.fourth), e.leftRotor && n.left && (e.leftRotor.windowLetter = n.left), e.centerRotor && n.center && (e.centerRotor.windowLetter = n.center), e.rightRotor && n.right && (e.rightRotor.windowLetter = n.right));
	}
}, pe = d()(p((e) => ({
	...m,
	setRotorType: (t, n) => {
		e((e) => {
			t === "fourth" ? e.fourthRotor = {
				type: n,
				ringPosition: 0,
				windowLetter: "A"
			} : e[`${t}Rotor`] = {
				type: n,
				ringPosition: 0,
				windowLetter: "A"
			}, e.history = [];
		});
	},
	addPlugBoardWiring: (t) => {
		e((e) => {
			e.wirings.push(t);
		});
	},
	update: ({ input: t, output: n, fourth: r, left: i, center: a, right: o }) => {
		e((e) => {
			e.input += t, e.output += n, e.history.push({
				fourth: e.fourthRotor?.windowLetter,
				left: e.leftRotor?.windowLetter,
				center: e.centerRotor?.windowLetter,
				right: e.rightRotor?.windowLetter
			}), e.fourthRotor && r && (e.fourthRotor = {
				...e.fourthRotor,
				...r
			}), e.leftRotor && r && (e.leftRotor = {
				...e.leftRotor,
				...i
			}), e.centerRotor && a && (e.centerRotor = {
				...e.centerRotor,
				...a
			}), e.rightRotor && o && (e.rightRotor = {
				...e.rightRotor,
				...o
			});
		});
	},
	removePlugBoardWiring: (t) => {
		e((e) => {
			e.wirings = e.wirings.filter(_(t));
		});
	},
	setUhrSetting: (t) => {
		e((e) => {
			e.uhrSetting !== t && (e.uhrSetting = t);
		});
	},
	setMachineType: (t) => {
		e((e) => ({
			...e,
			...m,
			type: t
		}));
	},
	setReflectorType: (t) => {
		e((e) => {
			e.reflector = {
				type: t,
				wirings: []
			}, e.type === "M4" && !g.includes(t) && (e.fourthRotor = void 0), e.history = [];
		});
	},
	addReflectorWiring: (t) => {
		e((e) => {
			e.reflector && (e.reflector.wirings.push(t), e.history = []);
		});
	},
	removeReflectorWiring: (t) => {
		e((e) => {
			e.reflector && (e.reflector.wirings = e.reflector.wirings.filter(_(t)), e.history = []);
		});
	},
	setRotorRingPosition: (t, n) => {
		e((e) => {
			let r = `${t}Rotor`;
			e[r] != null && (e[r].ringPosition = n, e.history = []);
		});
	},
	setRotorWindowLetter: (t, n) => {
		e((e) => {
			let r = `${t}Rotor`;
			e[r] != null && (e[r].windowLetter = n);
		});
	},
	clear: () => {
		e((e) => {
			e.input = "", e.output = "", e.history.length > 0 && (v(e, 0), e.history = []);
		});
	},
	backspace: () => {
		e((e) => {
			e.history.length > 0 && (e.input = e.input.slice(0, -1), e.output = e.output.slice(0, -1), v(e, e.history.length - 1), e.history.pop());
		});
	},
	importSettings: (t) => {
		e(() => ({
			...m,
			...t
		}));
	}
}))), y = () => {
	let { setMachineType: d, addPlugBoardWiring: f, removePlugBoardWiring: p, setUhrSetting: m, setReflectorType: v, addReflectorWiring: y, removeReflectorWiring: b, setRotorRingPosition: x, setRotorType: S, setRotorWindowLetter: C, update: w, type: T, wirings: E, history: D, backspace: O, clear: k, importSettings: A, ...j } = pe(), M = u(new e()), N = u(void 0), P = l((n) => {
		N.current = void 0, n === "M3" ? M.current = new e() : M.current = new t();
	}, []), me = l((e) => {
		P(e), d(e);
	}, [P, d]), F = l((e, t) => {
		N.current instanceof c ? M.current.getPlugBoard().plugWire(N.current.prepareUhrWire(e, ...t)) : M.current.getPlugBoard().plugWire(...t);
	}, []), he = l((e) => {
		F(E.length + 1, e), f(e);
	}, [
		E,
		F,
		f
	]), ge = l((e) => {
		if (N.current instanceof c) {
			let t = E.findIndex(_(e)) + 1;
			t > 0 && M.current.getPlugBoard().unplugWire(N.current.getUhrWire(t));
		} else M.current.getPlugBoard().unplugWire(...e);
		p(e);
	}, [E, p]), I = l((e) => {
		N.current = new c(), N.current.prepareUhrWires(e), M.current.getPlugBoard().unplugAllWires(), M.current.getPlugBoard().plugWires(N.current.getUhrWires());
	}, []), _e = l(() => {
		I(E), m(0);
	}, [
		E,
		I,
		m
	]), ve = l(() => {
		M.current.getPlugBoard().unplugAllWires(), M.current.getPlugBoard().plugWires(E), N.current = void 0, m(void 0);
	}, [E, m]), L = l((e) => N.current instanceof c && (N.current.setUhrSetting(e), !0), []), ye = l((e) => {
		L(e) && m(e);
	}, [L, m]), R = j.uhrSetting == null || E.length === 10, z = l((e) => {
		let s;
		switch (e) {
			case "A":
				s = new n();
				break;
			case "B":
				s = new r();
				break;
			case "C":
				s = new a();
				break;
			case "Beta":
				s = new i();
				break;
			case "Gamma":
				s = new ee();
				break;
			case "Thin B":
				s = new ce();
				break;
			case "Thin C":
				s = new le();
				break;
			case "D":
				s = new o();
				break;
			default: throw Error("Cannot create a new reflector instance");
		}
		M.current.setReflector(s), M.current instanceof t && !g.includes(e) && M.current.unsetRotor(t.FOURTH_ROTOR);
	}, []), be = l((e) => {
		z(e), v(e);
	}, [z, v]), B = l((e) => {
		let t = M.current.getReflector();
		return t instanceof o && (t.plugWireInAlliedNotation(...e), !0);
	}, []), xe = l((e) => {
		B(e) && y(e);
	}, [B, y]), Se = l((e) => {
		let t = M.current.getReflector();
		t instanceof o && (t.unplugWireInAlliedNotation(...e), b(e));
	}, [b]), V = l((e, t) => {
		let n;
		switch (t) {
			case "I":
				n = new s();
				break;
			case "II":
				n = new te();
				break;
			case "III":
				n = new ne();
				break;
			case "IV":
				n = new re();
				break;
			case "V":
				n = new ie();
				break;
			case "VI":
				n = new ae();
				break;
			case "VII":
				n = new oe();
				break;
			case "VIII":
				n = new se();
				break;
			case "Beta":
				n = new ue();
				break;
			case "Gamma":
				n = new de();
				break;
			default: throw Error("Cannot create a new rotor instance");
		}
		M.current.setRotor(n, h(e));
	}, []), Ce = l((e, t) => {
		V(e, t), S(e, t);
	}, [V, S]), H = l((e, t) => {
		let n = M.current.getRotor(h(e));
		return n != null && (n.setRingPosition(t), !0);
	}, []), we = l((e, t) => {
		H(e, t) && x(e, t);
	}, [H, x]), U = l((e, t) => {
		M.current.setRotorWindowLetter(t, h(e));
	}, []), W = l((e, t) => {
		U(e, t), C(e, t);
	}, [U, C]), Te = l((n) => {
		let r = M.current.encode(n);
		w({
			input: n,
			output: r,
			fourth: T === "M4" ? {
				ringPosition: M.current.getRotor(t.FOURTH_ROTOR)?.ringPosition ?? 0,
				windowLetter: M.current.getRotorWindowLetter(t.FOURTH_ROTOR)
			} : void 0,
			left: {
				ringPosition: M.current.getRotor(e.LEFT_ROTOR)?.ringPosition ?? 0,
				windowLetter: M.current.getRotorWindowLetter(e.LEFT_ROTOR)
			},
			center: {
				ringPosition: M.current.getRotor(e.CENTER_ROTOR)?.ringPosition ?? 0,
				windowLetter: M.current.getRotorWindowLetter(e.CENTER_ROTOR)
			},
			right: {
				ringPosition: M.current.getRotor(e.RIGHT_ROTOR)?.ringPosition ?? 0,
				windowLetter: M.current.getRotorWindowLetter(e.RIGHT_ROTOR)
			}
		});
	}, [w, T]), G = l((n) => {
		if (D.length > 0 && n >= 0 && n < D.length) {
			let r = D[n];
			T === "M4" && r.fourth != null && M.current.setRotorWindowLetter(r.fourth, t.FOURTH_ROTOR), r.left != null && M.current.setRotorWindowLetter(r.left, e.LEFT_ROTOR), r.center != null && M.current.setRotorWindowLetter(r.center, e.CENTER_ROTOR), r.right != null && M.current.setRotorWindowLetter(r.right, e.RIGHT_ROTOR);
		}
	}, [T, D]), Ee = l(() => {
		D.length > 0 && (G(D.length - 1), O());
	}, [
		D,
		G,
		O
	]), De = l(() => {
		D.length > 0 && G(0), k();
	}, [
		D,
		G,
		k
	]), Oe = l((e) => {
		P(e.type), e.reflector && (z(e.reflector.type), e.reflector.type === "D" && e.reflector.wirings.forEach(B));
		let t = (e, t) => {
			t && (V(e, t.type), H(e, t.ringPosition), U(e, t.windowLetter));
		};
		t("fourth", e.fourthRotor), t("left", e.leftRotor), t("center", e.centerRotor), t("right", e.rightRotor), e.uhrSetting != null && L(e.uhrSetting), e.wirings.forEach((e, t) => F(t, e)), A(e);
	}, [
		P,
		z,
		B,
		V,
		H,
		U,
		L,
		F,
		A
	]), K = !!j.fourthRotor?.type, q = !!j.leftRotor?.type, J = !!j.centerRotor?.type, Y = !!j.rightRotor?.type, X = T === "M4" && (j.reflector?.type == null || g.includes(j.reflector.type)), Z = !(!j.reflector?.type || j.reflector.type === "D" && j.reflector.wirings.length !== 12), Q = T === "M3" || !X, ke = Z && (Q || K) && q && J && Y && R, Ae = T === "M4" && j.fourthRotor?.windowLetter === "A" && j.fourthRotor.ringPosition === 0 && (j.reflector?.type === "Thin B" && j.fourthRotor.type === "Beta" || j.reflector?.type === "Thin C" && j.fourthRotor.type === "Gamma"), je = D.length > 0, $ = {
		...j,
		type: T,
		isMachineValid: ke,
		wirings: E,
		isPlugBoardValid: R,
		isReflectorValid: Z,
		isInteropReflector: Ae,
		isFourthRotorValid: K,
		isLeftRotorValid: q,
		isCenterRotorValid: J,
		isRightRotorValid: Y,
		isFourthRotorEnabled: X,
		isHistoryAvailable: je,
		isM3Compatible: Q
	};
	return fe($), {
		...$,
		setMachineType: me,
		addPlugBoardWiring: he,
		removePlugBoardWiring: ge,
		plugUhr: _e,
		unplugUhr: ve,
		setUhrSetting: ye,
		setReflectorType: be,
		addReflectorWiring: xe,
		removeReflectorWiring: Se,
		setRotorType: Ce,
		setRotorRingPosition: we,
		setRotorWindowLetter: W,
		encode: Te,
		backspace: Ee,
		clear: De,
		importSettings: Oe
	};
};
//#endregion
export { g as thinReflectors, y as useEnigma };
