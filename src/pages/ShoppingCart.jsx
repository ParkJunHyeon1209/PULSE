import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

export default function ShoppingCart() {
  const cart = useCartStore((state) => state.cart);
  const removeCart = useCartStore((state) => state.removeCart);
  const increaseQuantity = useCartStore((state) => state.addToCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const resetCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const removeSelected = useCartStore((state) => state.removeSelected);
  const onChange = useCartStore((state) => state.onChange);
  const isAllChecked = Boolean(cart.filter((item) => item.checked === false).length);
  const handleAllChange = useCartStore((state) => state.handleAllChange);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 성공 시 로직
        const response = await fetch('/data/products.json');

        if (!response.ok) {
          throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        // 실패 시 로직
        console.error('데이터 로드 중 오류 발생:', error);
      } finally {
        // 성공하든 실패하든 로딩 종료
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>PULSE 장비 로딩 중...</div>;

  return (
    <>
      <div>
        <p>SHOPPING CART {cart.length ? cart.length : 0}</p>
        <h2>YOUR PULSE</h2>
      </div>
      <div>
        <div className="cart-list">
          {cart.length > 0 ? (
            <div>
              <div className="list-control">
                <div className="check-box">
                  <input type="checkbox" checked={!isAllChecked} onChange={handleAllChange} />
                  <span>전체 선택</span>
                </div>
                <div className="deletes">
                  <button onClick={removeSelected}>선택삭제</button>
                  <button onClick={resetCart}>전체삭제</button>
                </div>
              </div>
              <div className="list-content">
                <ul>
                  {cart.map((item) => (
                    <li key={item.id}>
                      <div className="content-info">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => onChange(item.id)}
                        />
                        <img src={item.thumbnail} alt={item.title} />
                        <div className="primary-info">
                          <p>{item.category}</p>
                          <h3>{item.title}</h3>
                          {/* <p>{item.options.Object.Values()}</p> */}
                          <p>{item.price.toLocaleString()}원</p>
                        </div>
                      </div>
                      <div className="control-item">
                        <button
                          onClick={() => {
                            removeCart(item.id);
                          }}
                        >
                          X
                        </button>
                        <div className="qty">
                          <button onClick={() => decreaseQuantity(item)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item)}>+</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              <p>이미지</p>
              <p>카트가 비어 있습니다.</p>
              <p>아직 추가된 장비가 없습니다.</p>
              <p>당신의 PULSE를 찾아보세요.</p>
              <button onClick={() => navigate('/')}>EXPLORE GEAR</button>
            </>
          )}
        </div>
        <div className="summary">
          <div className="price">
            <h3>ORDER SUMMARY</h3>
            <p>
              상품 합계 <span>0원</span>
            </p>
            <p>
              배송비 <span>FREE</span>
            </p>
            <p>
              할인 <span>-0원</span>
            </p>
            <p>
              TOTAL <span>0원</span>
            </p>
          </div>
          <div className="coupon">
            <input type="text" placeholder="코드를 입력해주세요" />
            <button>APPLY</button>
          </div>
          <button>주문하기</button>
          <span>TRUSTED</span>
          <span>SECURE</span>
          <div className="payment-method">
            <p>visa</p>
            <p>master-card</p>
            <p>kakao-pay</p>
            <p>naver-pay</p>
          </div>
        </div>

        {/* tag가 best인 제품만 추천 */}
        <div className="recommend">
          <h2>ALSO IN YOUR SETUP</h2>
          <ul>
            {products
              .filter((product) => product.tag === 'BEST')
              .map((product) => (
                <li key={product.id}>
                  <div className="thumbnail-img">
                    <img src={product.thumbnail} alt={product.title} />
                  </div>
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p>{product.price}</p>
                    <button
                      onClick={() => {
                        increaseQuantity(product);
                        console.log(product.quantity);
                      }}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
