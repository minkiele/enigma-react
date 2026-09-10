import { Enigma as e, EnigmaM4 as t, ReflectorA as n, ReflectorB as r, ReflectorBeta as i, ReflectorC as a, ReflectorD as o, ReflectorGamma as s, RotorI as c, RotorII as ee, RotorIII as te, RotorIV as ne, RotorV as re, RotorVI as ie, RotorVII as ae, RotorVIII as oe, ThinReflectorB as se, ThinReflectorC as ce, ThinRotorBeta as le, ThinRotorGamma as ue, Uhr as l } from "enigma-minkiele";
import { useCallback as u, useDebugValue as de, useRef as d } from "react";
import { create as f } from "zustand";
import { produce as p } from "immer";
var m = (e) => (t, n, r) => (r.setState = (e, n, ...r) => t(typeof e == "function" ? p(e) : e, n, ...r), e(r.setState, n, r)), h = {
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
}, g = (n) => {
	switch (n) {
		case "fourth": return t.FOURTH_ROTOR;
		case "left": return e.LEFT_ROTOR;
		case "center": return e.CENTER_ROTOR;
		case "right": return e.RIGHT_ROTOR;
	}
}, _ = ["Thin B", "Thin C"], v = (e) => (t) => !(e[0] === t[0] && e[1] === t[1] || e[0] === t[1] && e[1] === t[0]), y = (e, t) => {
	if (e.history.length > 0 && t >= 0 && t < e.history.length) {
		let n = e.history[t];
		n && (e.fourthRotor && n.fourth && (e.fourthRotor.windowLetter = n.fourth), e.leftRotor && n.left && (e.leftRotor.windowLetter = n.left), e.centerRotor && n.center && (e.centerRotor.windowLetter = n.center), e.rightRotor && n.right && (e.rightRotor.windowLetter = n.right));
	}
}, b = f()(m((e) => ({
	...h,
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
			e.wirings = e.wirings.filter(v(t));
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
			...h,
			type: t
		}));
	},
	setReflectorType: (t) => {
		e((e) => {
			e.reflector = {
				type: t,
				wirings: []
			}, e.type === "M4" && !_.includes(t) && (e.fourthRotor = void 0), e.history = [];
		});
	},
	addReflectorWiring: (t) => {
		e((e) => {
			e.reflector && (e.reflector.wirings.push(t), e.history = []);
		});
	},
	removeReflectorWiring: (t) => {
		e((e) => {
			e.reflector && (e.reflector.wirings = e.reflector.wirings.filter(v(t)), e.history = []);
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
			e.input = "", e.output = "", e.history.length > 0 && (y(e, 0), e.history = []);
		});
	},
	backspace: () => {
		e((e) => {
			e.history.length > 0 && (e.input = e.input.slice(0, -1), e.output = e.output.slice(0, -1), y(e, e.history.length - 1), e.history.pop());
		});
	},
	importSettings: (t) => {
		e(() => ({
			...h,
			...t
		}));
	}
}))), x = () => {
	let { setMachineType: f, addPlugBoardWiring: p, removePlugBoardWiring: m, setUhrSetting: h, setReflectorType: y, addReflectorWiring: x, removeReflectorWiring: S, setRotorRingPosition: C, setRotorType: w, setRotorWindowLetter: T, update: E, type: D, wirings: O, history: k, backspace: A, clear: j, importSettings: M, ...N } = b(), P = d(new e()), F = d(void 0), I = u((n) => {
		F.current = void 0, n === "M3" ? P.current = new e() : P.current = new t();
	}, []), fe = u((e) => {
		I(e), f(e);
	}, [I, f]), L = u((e, t) => {
		F.current instanceof l ? P.current.getPlugBoard().plugWire(F.current.prepareUhrWire(e, ...t)) : P.current.getPlugBoard().plugWire(...t);
	}, []), pe = u((e) => {
		L(O.length + 1, e), p(e);
	}, [
		O,
		L,
		p
	]), me = u((e) => {
		if (F.current instanceof l) {
			let t = O.findIndex(v(e)) + 1;
			t > 0 && P.current.getPlugBoard().unplugWire(F.current.getUhrWire(t));
		} else P.current.getPlugBoard().unplugWire(...e);
		m(e);
	}, [O, m]), R = u((e) => {
		F.current = new l(), F.current.prepareUhrWires(e), P.current.getPlugBoard().unplugAllWires(), P.current.getPlugBoard().plugWires(F.current.getUhrWires());
	}, []), he = u(() => {
		R(O), h(0);
	}, [
		O,
		R,
		h
	]), ge = u(() => {
		P.current.getPlugBoard().unplugAllWires(), P.current.getPlugBoard().plugWires(O), F.current = void 0, h(void 0);
	}, [O, h]), z = u((e) => F.current instanceof l && (F.current.setUhrSetting(e), !0), []), _e = u((e) => {
		z(e) && h(e);
	}, [z, h]), B = N.uhrSetting == null || O.length === 10, V = u((e) => {
		let c;
		switch (e) {
			case "A":
				c = new n();
				break;
			case "B":
				c = new r();
				break;
			case "C":
				c = new a();
				break;
			case "Beta":
				c = new i();
				break;
			case "Gamma":
				c = new s();
				break;
			case "Thin B":
				c = new se();
				break;
			case "Thin C":
				c = new ce();
				break;
			case "D":
				c = new o();
				break;
			default: throw Error("Cannot create a new reflector instance");
		}
		P.current.setReflector(c), P.current instanceof t && !_.includes(e) && P.current.unsetRotor(t.FOURTH_ROTOR);
	}, []), ve = u((e) => {
		V(e), y(e);
	}, [V, y]), H = u((e) => {
		let t = P.current.getReflector();
		return t instanceof o && (t.plugWireInAlliedNotation(...e), !0);
	}, []), ye = u((e) => {
		H(e) && x(e);
	}, [H, x]), be = u((e) => {
		let t = P.current.getReflector();
		t instanceof o && (t.unplugWireInAlliedNotation(...e), S(e));
	}, [S]), U = u((e, t) => {
		let n;
		switch (t) {
			case "I":
				n = new c();
				break;
			case "II":
				n = new ee();
				break;
			case "III":
				n = new te();
				break;
			case "IV":
				n = new ne();
				break;
			case "V":
				n = new re();
				break;
			case "VI":
				n = new ie();
				break;
			case "VII":
				n = new ae();
				break;
			case "VIII":
				n = new oe();
				break;
			case "Beta":
				n = new le();
				break;
			case "Gamma":
				n = new ue();
				break;
			default: throw Error("Cannot create a new rotor instance");
		}
		P.current.setRotor(n, g(e));
	}, []), xe = u((e, t) => {
		U(e, t), w(e, t);
	}, [U, w]), W = u((e, t) => {
		let n = P.current.getRotor(g(e));
		return n != null && (n.setRingPosition(t), !0);
	}, []), Se = u((e, t) => {
		W(e, t) && C(e, t);
	}, [W, C]), G = u((e, t) => {
		P.current.setRotorWindowLetter(t, g(e));
	}, []), Ce = u((e, t) => {
		G(e, t), T(e, t);
	}, [G, T]), we = u((n) => {
		let r = P.current.encode(n);
		E({
			input: n,
			output: r,
			fourth: D === "M4" ? {
				ringPosition: P.current.getRotor(t.FOURTH_ROTOR)?.ringPosition ?? 0,
				windowLetter: P.current.getRotorWindowLetter(t.FOURTH_ROTOR)
			} : void 0,
			left: {
				ringPosition: P.current.getRotor(e.LEFT_ROTOR)?.ringPosition ?? 0,
				windowLetter: P.current.getRotorWindowLetter(e.LEFT_ROTOR)
			},
			center: {
				ringPosition: P.current.getRotor(e.CENTER_ROTOR)?.ringPosition ?? 0,
				windowLetter: P.current.getRotorWindowLetter(e.CENTER_ROTOR)
			},
			right: {
				ringPosition: P.current.getRotor(e.RIGHT_ROTOR)?.ringPosition ?? 0,
				windowLetter: P.current.getRotorWindowLetter(e.RIGHT_ROTOR)
			}
		});
	}, [E, D]), K = u((n) => {
		if (k.length > 0 && n >= 0 && n < k.length) {
			let r = k[n];
			D === "M4" && r.fourth != null && P.current.setRotorWindowLetter(r.fourth, t.FOURTH_ROTOR), r.left != null && P.current.setRotorWindowLetter(r.left, e.LEFT_ROTOR), r.center != null && P.current.setRotorWindowLetter(r.center, e.CENTER_ROTOR), r.right != null && P.current.setRotorWindowLetter(r.right, e.RIGHT_ROTOR);
		}
	}, [D, k]), Te = u(() => {
		k.length > 0 && (K(k.length - 1), A());
	}, [
		k,
		K,
		A
	]), Ee = u(() => {
		k.length > 0 && K(0), j();
	}, [
		k,
		K,
		j
	]), De = u((e) => {
		I(e.type), e.reflector && (V(e.reflector.type), e.reflector.type === "D" && e.reflector.wirings.forEach(H));
		let t = (e, t) => {
			t && (U(e, t.type), W(e, t.ringPosition), G(e, t.windowLetter));
		};
		t("fourth", e.fourthRotor), t("left", e.leftRotor), t("center", e.centerRotor), t("right", e.rightRotor), e.uhrSetting != null && z(e.uhrSetting), e.wirings.forEach((e, t) => L(t, e)), M(e);
	}, [
		I,
		V,
		H,
		U,
		W,
		G,
		z,
		L,
		M
	]), q = !!N.fourthRotor?.type, J = !!N.leftRotor?.type, Y = !!N.centerRotor?.type, X = !!N.rightRotor?.type, Z = D === "M4" && (N.reflector?.type == null || _.includes(N.reflector.type)), Q = !(!N.reflector?.type || N.reflector.type === "D" && N.reflector.wirings.length !== 12), Oe = Q && (D === "M3" || q || !Z) && J && Y && X && B, ke = D === "M4" && N.fourthRotor?.windowLetter === "A" && N.fourthRotor.ringPosition === 0 && (N.reflector?.type === "Thin B" && N.fourthRotor.type === "Beta" || N.reflector?.type === "Thin C" && N.fourthRotor.type === "Gamma"), Ae = k.length > 0, $ = {
		...N,
		type: D,
		isMachineValid: Oe,
		wirings: O,
		isPlugBoardValid: B,
		isReflectorValid: Q,
		isInteropReflector: ke,
		isFourthRotorValid: q,
		isLeftRotorValid: J,
		isCenterRotorValid: Y,
		isRightRotorValid: X,
		isFourthRotorEnabled: Z,
		isBackspaceEnabled: Ae
	};
	return de($), {
		...$,
		setMachineType: fe,
		addPlugBoardWiring: pe,
		removePlugBoardWiring: me,
		plugUhr: he,
		unplugUhr: ge,
		setUhrSetting: _e,
		setReflectorType: ve,
		addReflectorWiring: ye,
		removeReflectorWiring: be,
		setRotorType: xe,
		setRotorRingPosition: Se,
		setRotorWindowLetter: Ce,
		encode: we,
		backspace: Te,
		clear: Ee,
		importSettings: De
	};
};
//#endregion
export { _ as thinReflectors, x as useEnigma };
