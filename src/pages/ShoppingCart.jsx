import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShoppingCart() {
  const cart = [{ id: 1 }]; // 장바구니 스토어에서 가져올 예정
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const products = [{ id: 100 }];
  return (
    <>
      <div>
        <p>SHOPPING CART {cart?.length ? cart.length : 0}</p>
        <h2>YOUR PULSE</h2>
      </div>
      <div>
        <div className="cart-list">
          {cart?.length > 0 ? (
            <div>
              <div className="list-control">
                <div className="check-box">
                  <input type="checkbox" />
                  <span>전체 선택</span>
                </div>
                <div className="deletes">
                  <button>선택삭제</button>
                  <button>전체삭제</button>
                </div>
              </div>
              <div className="list-content">
                <ul>
                  {cart.map((item) => (
                    <li key={item.id}>
                      <div className="content-info">
                        <input type="checkbox" />
                        <span>이미지 자리</span>
                        <div className="primary-info">
                          <p>badge</p>
                          <h3>제품명</h3>
                          <p>옵션 : </p>
                          <p>price: 000원</p>
                        </div>
                      </div>
                      <div className="control-item">
                        <button>X</button>
                        <div className="qty">
                          <button
                            onClick={() => {
                              setQty((prev) => prev - 1);
                            }}
                          >
                            -
                          </button>
                          <button>{qty}</button>
                          <button
                            onClick={() => {
                              setQty((prev) => prev + 1);
                            }}
                          >
                            +
                          </button>
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
            <input type="text" />
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
        <div className="recommend">
          <h2>ALSO IN YOUR SETUP</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <div className="thumbnail-img">
                  <p>이미지 나올 예정</p>
                </div>
                <div className="product-info">
                  <h3>제품명</h3>
                  <p>가격 나올 예정</p>
                  <button>+</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
